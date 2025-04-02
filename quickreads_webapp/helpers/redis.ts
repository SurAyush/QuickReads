import { createClient } from 'redis';

const redis_client = createClient({
  url: process.env.REDIS_URL, 
  socket: {
    reconnectStrategy: retries => Math.min(retries * 50, 1000),
  }
});

redis_client.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
  if (!redis_client.isOpen) await redis_client.connect();
})();

export default redis_client;
