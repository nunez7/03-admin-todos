import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import * as yup from 'yup';

interface Segments{
    params: {
        id: string;
    }
}
const getTodo = async(id: string): Promise<Todo | null> =>{
    return await prisma.todo.findFirst({where:{id: id}});
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
        const todo = await prisma.todo.delete({where:{id: id}});
        return NextResponse.json({message: `TODO con ID ${id} eliminado`})
   } catch (error) {
        return NextResponse.json({message: 'TODO con ID no existe'}, {status: 400})
   }
}