import * as joi from 'joi';

import { User } from './user.entity';

export const userSchema = joi.object<User>({

  name: joi
    .string()
    .min(5)
    .max(50),

  lastname: joi
    .string()
    .min(5)
    .max(50),

  age: joi
    .number()
    .min(1)
    .max(99),

  isActive: joi
    .boolean()

});