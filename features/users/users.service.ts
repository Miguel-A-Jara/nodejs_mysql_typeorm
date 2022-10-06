import { Request, Response } from 'express';

import { AppDataSource } from '../../dbConfig';

import { userSchema } from './users.validation';
import { prodSchema } from './../products/product.validation';

import { User }    from './user.entity';
import { Product } from '../products/product.entity';

type Req = Request;
type Res = Response;

const userRepository = AppDataSource.getRepository(User);
const prodRepository = AppDataSource.getRepository(Product);

export const getUsers = async (req: Req, res: Res) => {
  const users = await userRepository.find({ relations: { products: true } });
  res.send(users);
};

export const getSingleUser = async (req: Req, res: Res) => {

  let user: User | null = null;
  const { id } = req.params;

  /* It will return true only when id is a number */
  if ( !isNaN(+id) ) user = await userRepository.findOne({ 
    where: { id: +id }, 
    relations: { products: true } 
  });

  /* It will return true only when id is text */
  if ( isNaN(+id) ) user = await userRepository.findOne({ 
    where: { id: +id },
    relations: { products: true }
  });

  if ( !user ) return res.status(404).send({ error: 'User not found' });

  /* If we get to this point, it's safe to return the User */
  res.send(user);

};

export const createUser = async (req: Req, res: Res) => {

  const user = req.body;
  const { products, ...userBody } = user;

  if (!isValidUserBody(user, res, 'required', true)) return; /* <- If it's not a valid body, we end the program */
  
  const parsedUser = userRepository.create({
    ...userBody,
    products: (products as Product[]).map(product => prodRepository.create(product))
  });

  const savedResponse = await userRepository.save( parsedUser );
  
  res.send(savedResponse);
};

export const updateUser = async (req: Req, res: Res) => {

  const { id } = req.params;
  const updateUser: User = req.body;
  const { products, ...userBody } = updateUser;

  if (!isValidUserBody(updateUser, res, 'optional', false)) 
    return; /* <- If it's not a valid body, we end the program */

  let updateBody: User = updateUser;

  if ( !products ) {
    const fetchedProducts = await prodRepository.createQueryBuilder()
      .where('userId = :id', { id: +id })
      .getMany();    

    updateBody = { ...updateBody, products: fetchedProducts };
  }

  const userToUpdate = await userRepository.preload({ ...updateBody, id: +id });
  if ( !userToUpdate ) return res.send('User not found');
  
  const updatedUser = await userRepository.save(userToUpdate); /* <-- Debe de ser el ultimo paso */
  res.send(updatedUser);
};

export const deleteUser = async (req: Req, res: Res) => {

  const { id } = req.params;

  /* It will return true only when id is text */
  if (isNaN(+id)) 
    return res.status(400).send({ error: 'Can only delete users by "id"' });

  const userResponse = await userRepository.delete({ id: +id });
  if ( typeof userResponse.affected === 'number' && userResponse.affected < 1 ) 
    return res.status(400).send({ error: 'User not found, deletion was not successful' });

  res.send(userResponse);
};

const isValidUserBody = (
  user: any, 
  res: Res, 
  validateUser: 'required' | 'optional',
  validateProd: boolean
) => {

  const { products, ...userBody } = user;

  if ( Object.keys(user).length < 1 ) {
    res.status(400).send({ error: 'Send a valid user' });
    return false;
  }

  const { error: errorUser } = userSchema.validate(userBody, { presence: validateUser });
  if ( errorUser ) {
    res.send({ errorUser });
    return false;
  }

  if ( validateProd || products ) {
    const { error: errorProd } = prodSchema.validate(products, { presence: 'required' }); 
    if ( errorProd ) {
      res.send({ errorProd });
      return false;
    }
  }
  
  return true;
};