import { publicProcedure } from '@/server/trpc';
import { PrismaClient, Restaurant } from '@prisma/client';
import * as yup from 'yup';
const prisma = new PrismaClient();
export const getAllRestaurantController = publicProcedure
  .input(
    yup.object({
      page_num: yup.number().min(1).required(),
      page_size: yup.number().min(1).required(),
    })
  )
  .query(async ({ input }) => {
    const limit = input.page_size;
    const offset = input.page_size * (input.page_num - 1);
    let listRestaurant: Restaurant[] = [];
    listRestaurant = await prisma.restaurant.findMany({
      skip: offset,
      take: limit,
    });
    return listRestaurant;
  });
