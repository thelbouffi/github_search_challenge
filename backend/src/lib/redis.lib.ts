import * as redis from 'redis';

import config from '@config/index';

const client = redis.createClient(config.redis.dbconfig);

client.on('connect', () => {
  console.log('Client connected to redis...');
});

client.on('ready', () => {
  console.log('Client connected to redis and ready to use...');
});

client.on('error', (err) => {
  console.log(err.message);
});

client.on('end', () => {
  console.log('Client disconnected from redis');
});

process.on('SIGINT', () => {
  console.log('Redis client killed');
  client.quit();
});

export default client;
