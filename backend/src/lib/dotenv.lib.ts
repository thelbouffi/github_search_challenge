import { config } from 'dotenv';

config({
  path: '.env/.common.env',
});

config({
  path: `.env/.${process.env.NODE_ENV || 'local'}.env`,
});
