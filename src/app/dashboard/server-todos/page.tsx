export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from "@/actions/auth-actions";
import { NewTodo } from "@/components";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'Listado de TODOs',
 description: 'Listado de TODOs',
};

export default async function ServerTodosPage() {

  const user = await getUserSessionServer();

  if(!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: {userId: user.id},
    orderBy: {description: 'asc'}
  });

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