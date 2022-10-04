import express from 'express';

import { userRoutes } from '../features/users';

export const appRoutes = express();

/* =========== Routes =========== */
appRoutes.use('/users', userRoutes);