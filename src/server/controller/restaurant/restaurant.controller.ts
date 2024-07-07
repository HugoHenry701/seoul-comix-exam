import { redisGet, redisSet } from '@/server/middleware/redis-services';
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
    const caching: (Restaurant & { featured: Feature })[] = await redisGet(
      `getAllRestaurantController-${limit}-${offset}-${keyword}`
    );
    if (caching) {
      return caching;
    }
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
    redisSet(
      `getAllRestaurantController-${limit}-${offset}-${keyword}`,
      listRestaurant,
      86400
    );
    return listRestaurant;
  });
export const addFavoriteRestaurantController = publicProcedure
  .input(
    yup.object({
      restaurant_id: yup.string().required(),
    })
  )
  .query(async ({ input }) => {
    const restaurant_id = input.restaurant_id;
    await prisma.restaurant.update({
      where: {
        id: restaurant_id,
      },
      data: {
        isFavorite: true,
      },
    });
    return true;
  });
