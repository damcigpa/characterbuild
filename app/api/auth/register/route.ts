import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, pass, name } = await req.json()

    if (!email || !pass) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const hashedPass = await bcrypt.hash(pass, 10)

    const user = await prisma.user.create({
      data: { email, name, pass: hashedPass },
    })

    return NextResponse.json(
      { message: 'User registered successfully', user },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
