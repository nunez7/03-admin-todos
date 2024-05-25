import { NewTodo } from "@/components";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listado de TODOs',
 description: 'Listado de TODOs',
};

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}});

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 pb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos}/>
    </>
  );
}