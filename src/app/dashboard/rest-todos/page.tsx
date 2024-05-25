export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NewTodo } from "@/components";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listado de TODOs',
 description: 'Listado de TODOs',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}});

  return (
    <div>
      {/* FORM para agregar TODOs */}
      <div className="w-full px-3 mx-5 pb-5">
        <NewTodo />
      </div>
      {/* GRIDs */}
      <TodosGrid todos={todos}/>
    </div>
  );
}