import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

  return NextResponse.json({
    saludo: 'Hola mundo'
  })
}

export async function POST(request: Request) { 

  return NextResponse.json({
    saludo: 'Hola mundo',
    method: 'POST'
  })
}