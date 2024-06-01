import { getUserSessionServer } from '@/actions/auth-actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments{
    params: {
        id: string;
    }
}
const getTodo = async(id: string): Promise<Todo | null> =>{
    const user = await getUserSessionServer();
    if(!user) return null;

    const todo = await prisma.todo.findFirst({where:{id: id}});
    
    if(todo?.userId !== user.id){
        return null;
    }
    return todo;
}

export async function GET(request: Request, {params}: Segments) { 
    const todo = await getTodo(params.id)

    if(!todo){
        return NextResponse.json({message: 'TODO con ID no existe'}, {status: 404})
    }

    return NextResponse.json({
        data: todo
    })
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional().max(100)
});

export async function PUT(request: Request, {params}: Segments) { 
    const todo =await getTodo(params.id)

    if(!todo){
        return NextResponse.json({message: 'TODO con ID no existe'}, {status: 404})
    }

    try {
        const {complete, description, ...rest} = await putSchema.validate(await request.json()) ;
        
        const update = await prisma.todo.update({
            where: {id: params.id},
            data: {complete, description}});
        return NextResponse.json(update);
    } catch (error) {
        return NextResponse.json(error, {status: 400});
    }
}

export async function DELETE(request: Request, {params}: Segments) { 
    const {id} = params;
   try {
        await prisma.todo.delete({where:{id: id}});
        return NextResponse.json({message: `TODO con ID ${id} eliminado`})
   } catch (error) {
        return NextResponse.json({message: 'TODO con ID no existe'}, {status: 400})
   }
}