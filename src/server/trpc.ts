import { initTRPC } from '@trpc/server';
import { redisConnect } from './middleware/redis-services';

const t = initTRPC.create();
try {
  redisConnect();
} catch (err) {
  console.log(err);
}
export const router = t.router;
export const publicProcedure = t.procedure;
export const server = t;
