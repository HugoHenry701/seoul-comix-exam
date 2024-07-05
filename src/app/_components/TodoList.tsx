'use client';
import { trpc } from "../_trpc/client";

export default function TodoList({
    className
}: { className?: string }) {
    const getTodos = trpc.getTodos.useQuery();

    return (
        <div className={className}>
            {
                getTodos.isFetching ? <p>Loading...</p> : <ul>
                    {
                        getTodos.data && getTodos.data.map((e, i) => (
                            <li key={i}>{e}</li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}