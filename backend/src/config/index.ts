import { sync } from 'glob';
import { resolve } from 'path';
import '@lib/dotenv.lib';

const config = {
  env: process.env.NODE_ENV || 'local',
  files: {
    routes: sync(resolve(__dirname, '../routes/**.routes.js')),
  },
  app: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  },
  redis: {
    dbconfig: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
      // db: 8 // to specify the db
    },
    expiration: process.env.REDIS_EXPIRE ? parseInt(process.env.REDIS_EXPIRE, 10) : 2 * 3600,
  },
};

export default config;
