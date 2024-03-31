// config/database.js
import { createClient } from 'redis';
import { promisify } from 'util';

const redisClient = createClient({
    password: 'gzuROPdWSbI73PAM8ThEja0msLaH5rdF',
    host: 'redis-16540.c274.us-east-1-3.ec2.cloud.redislabs.com',
    port: 16540
});

// Promisify Redis commands for async/await support
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

redisClient.on('connect', () => {
  console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export { redisClient, getAsync, setAsync };
