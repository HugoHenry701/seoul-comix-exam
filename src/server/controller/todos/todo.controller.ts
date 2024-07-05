import { publicProcedure } from "@/server/trpc"

export const getTodosController = publicProcedure.query(async () => {
    let result: number[] = []
    for (let index = 0; index < 10; index++) {
        const gen = Math.floor(Math.random() * 100);
        if (gen % 2 == 0) {
            result.push(gen);
        }
    }
    return result;
})