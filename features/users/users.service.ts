import { Request, Response } from 'express';

import { User } from './user.entity';
import { AppDataSource } from '../../dbConfig';
import { userSchema }    from './users.validation';

type Req = Request;
type Res = Response;

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (req: Req, res: Res) => {
  const users = await userRepository.find();
  res.send(users);
};

export const getSingleUser = async (req: Req, res: Res) => {

  let user: User | null = null;
  const { id } = req.params;

  /* It will return true only when id is a number */
  if ( !isNaN(+id) ) user = await userRepository.findOneBy({ id: +id });

  /* It will return true only when id is text */
  if ( isNaN(+id) ) user = await userRepository.findOneBy({ name: id });


  if ( !user ) return res.status(404).send({ error: 'User not found' });

  /* If we get to this point, it's safe to return the User */
  res.send(user);

};

export const createUser = async (req: Req, res: Res) => {

  const user = req.body;

  const { error } = userSchema.validate(user, { presence: 'required' });
  if ( error ) return res.send({ error });

  const userResponse = await userRepository.save(user);
  res.send(userResponse);
};

export const updateUser = async (req: Req, res: Res) => {

  const { id } = req.params;
  const updateUser = req.body;

  const { error } = userSchema.validate(updateUser, { presence: 'optional' });

  if ( error ) return res.status(400).send({ error });
  if ( Object.keys(updateUser).length < 1 ) 
    return res.status(404).send({ error: 'At least one field is required' });

  await userRepository.update(id, updateUser);
    
  const userResponse = await userRepository.findOneBy({id: +id});

  res.send(userResponse);
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

