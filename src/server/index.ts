import { getTodosController } from "./controller/todos/todo.controller";
import { router } from "./trpc";

export const appRouter = router({
    getTodos: getTodosController
})
export type AppRouter = typeof appRouter;