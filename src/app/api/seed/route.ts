import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    await prisma.todo.deleteMany(); // delete * from todo
    await prisma.user.deleteMany(); // delete * from user

    const user = await prisma.user.create({
        data: {
            email: "test1@google.com",
            password: bcrypt.hashSync('12345678'),
            roles: ['admin', 'super-user', 'client'],
            name: "Juanito Perez",
            todos: {
                create: [
                    { description: 'Piedra del alma', complete: true },
                    { description: 'Piedra del poder' },
                    { description: 'Piedra del tiempo' },
                    { description: 'Piedra del espacio' },
                    { description: 'Piedra de la realidad' }
                ]
            }
        }
    });

    /*await prisma.todo.createMany({
        data: [
            {description: 'Piedra del alma', complete: true},
            {description: 'Piedra del poder'},
            {description: 'Piedra del tiempo'},
            {description: 'Piedra del espacio'},
            {description: 'Piedra de la realidad'}
        ]
    })*/

    return NextResponse.json({ message: 'Seed Executed' });
}