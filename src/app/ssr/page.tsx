import { serverClient } from "../_trpc/serverClient"

export default async function SSRPage() {
    const todos = await serverClient.getTodos()
    return (
        <main className="max-w-3xl mx-auto mt-5">
            <ul>
                {
                    todos && todos.map((e, i) => (
                        <li key={i}>{e}</li>
                    ))
                }
            </ul>
        </main>
    )
}