import { DataSource } from 'typeorm';

import { Product } from './features/products/product.entity';
import { User }    from './features/users/user.entity';

const HOST = process.env.DBHOST;
const PORT = +process.env.DBPORT!;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: HOST,
  port: PORT,
  username: 'root',
  password: '0miguel15',
  database: 'test_typeorm',
  synchronize: true,
  entities: [User, Product],
});

const dbConfig = async () => {
  return await AppDataSource.initialize();
};

export default dbConfig;