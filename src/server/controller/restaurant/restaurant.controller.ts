import { publicProcedure } from '@/server/trpc';
import { Feature, PrismaClient, Restaurant } from '@prisma/client';
import * as yup from 'yup';
const prisma = new PrismaClient();
export const getAllRestaurantController = publicProcedure
  .input(
    yup.object({
      page_num: yup.number().min(1).required(),
      page_size: yup.number().min(1).required(),
      search: yup.string(),
    })
  )
  .query(async ({ input }) => {
    const limit = input.page_size;
    const offset = input.page_size * (input.page_num - 1);
    const keyword = input.search;

    const listRestaurant = await prisma.restaurant.findMany({
      relationLoadStrategy: 'join',
      include: {
        featured: true,
      },
      where: {
        name: {
          search: keyword,
        },
      },
      skip: offset,
      take: limit,
    });

    return listRestaurant;
  });
export const addFavoriteRestaurantController = publicProcedure
  .input(
    yup.object({
      restaurant_id: yup.string().required(),
      crr_favorite: yup.boolean().required(),
    })
  )
  .mutation(async ({ input }) => {
    const restaurant_id = input.restaurant_id;
    const crr_favorite = input.crr_favorite;

    const result = await prisma.restaurant.update({
      where: {
        id: restaurant_id,
      },
      data: {
        isFavorite: crr_favorite,
      },
    });

    return result;
  });
