import { appRouter } from '@/server';
import { server } from '@/server/trpc';

const createCaller = server.createCallerFactory(appRouter);
export const serverClient = createCaller({});
