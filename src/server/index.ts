import {
  getAllRestaurantController,
  addFavoriteRestaurantController,
} from './controller/restaurant/restaurant.controller';
import { router } from './trpc';

export const appRouter = router({
  getRestaurants: getAllRestaurantController,
  addFavorite: addFavoriteRestaurantController,
});
export type AppRouter = typeof appRouter;
