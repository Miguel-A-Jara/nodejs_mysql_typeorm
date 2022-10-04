import express from 'express';
import { getUsers, getSingleUser, createUser, deleteUser, updateUser } from './users.service';

export const userRoutes = express.Router();

userRoutes
  .get('/', getUsers)
  .get('/:id', getSingleUser)
  .post('/', createUser)
  .patch('/:id', updateUser)
  .delete('/:id', deleteUser);