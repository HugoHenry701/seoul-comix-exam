import { httpBatchLink } from "@trpc/client";
import {appRouter} from '@/server';
import { server } from "@/server/trpc";

// export const serverClient = appRouter.createCaller({
//      links:[
//         httpBatchLink({
//             url: process.env.BASE_API || ""
//         })
//      ]
// })
const createCaller = server.createCallerFactory(appRouter);
export const serverClient = createCaller({})