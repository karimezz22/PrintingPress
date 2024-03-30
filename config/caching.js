// config/caching.js

const redis = require('redis');

const createRedisClient = () => {
  const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
  });

  redisClient.on('connect', () => {
    console.log('Connected to Redis server');
  });

  redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
  });

  return redisClient;
};

module.exports = createRedisClient;
