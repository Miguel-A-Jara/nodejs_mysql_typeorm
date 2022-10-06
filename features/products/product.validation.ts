import * as joi from 'joi';

import { Product } from './product.entity';

const prodItem = joi.object<Product>({
  title: joi.string().min(5).max(50),

  description: joi.string().min(5).max(50),

  price: joi.number().min(1).max(99),

  isAvailable: joi.boolean(),
});

export const prodSchema = joi
  .array()
  .items(prodItem)
  .min(1);
