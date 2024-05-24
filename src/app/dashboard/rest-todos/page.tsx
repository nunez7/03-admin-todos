import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
 title: 'Listado de TODOs',
 description: 'Listado de TODOs',
};

export default async function RestTodosPage() {

  /*useEffect(() => {
    fetch('localhost:3000/api/todos/')
    .then(resp => resp.json())
    .then(console.log);
  }, [])*/

  const todos = await prisma.todo.findMany({orderBy: {description: 'asc'}});

  return (
    <div>
      {/* FORM para agregar TODOs */}
      <TodosGrid todos={todos}/>
    </div>
  );
}