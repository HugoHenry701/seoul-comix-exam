import { createClient } from 'redis';

const app_name = process.env.APP_NAME;
const client = createClient({
  password: process.env.REDIS_PASSWORD || '',
});

export const redisConnect = async () => {
  await client
    .on('ready', () => console.log('=========== Connected to Redis ==========='))
    .connect();
};
const redisSet = async (key: string, data: any, expiresInSeconds: number): Promise<void> => {
  await client.auth({
    password: process.env.REDIS_PASSWORD || '',
  });
  await client.setEx(`${key}_${app_name}`, expiresInSeconds, JSON.stringify(data));
};

const redisGet = async (key: string): Promise<any> => {
  await client.auth({
    password: process.env.REDIS_PASSWORD || '',
  });
  return new Promise((resolve, reject) => {
    client
      .get(`${key}_${app_name}`)
      .then((data) => {
        resolve(data ? JSON.parse(data) : null);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const redisDel = async (key: string): Promise<void> => {
  await client.auth({
    password: process.env.REDIS_PASSWORD || '',
  });
  await client.del(`${key}_${app_name}`);
};

export { redisDel, redisGet, redisSet };
