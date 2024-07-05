import { getAllRestaurantController } from './controller/restaurant/restaurant.controller';
import { getTodosController } from './controller/todos/todo.controller';
import { router } from './trpc';

export const appRouter = router({
  getAllRestaurant: getAllRestaurantController,
  getTodos: getTodosController,
});
export type AppRouter = typeof appRouter;
