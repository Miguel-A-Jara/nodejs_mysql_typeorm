import express from 'express';

import { appRoutes } from './routes';
import dbConfig from './dbConfig';

const PORT = 5000;
const app = express();
const ROUTES_PREFIX = '/api/';

/* ========== Middlewares =========== */
app.use(express.json());
app.use(ROUTES_PREFIX, appRoutes);

dbConfig()
  .then(() => {
    console.log('Database initialized successfully');

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
