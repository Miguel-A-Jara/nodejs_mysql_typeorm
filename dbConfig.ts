import { DataSource } from 'typeorm';
import { User } from './features/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3080,
  username: 'miguel',
  password: '0miguel15',
  database: 'test_typeorm',
  synchronize: true,
  entities: [User],
});

const dbConfig = async () => {
  return await AppDataSource.initialize();
};

export default dbConfig;