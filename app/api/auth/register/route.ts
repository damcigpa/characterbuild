import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import validator from 'validator'

const prisma = new PrismaClient()

const userSchema = z.object({
  email: z.string().email(),
  pass: z.string().min(6),
  name: z.string().min(1).max(100),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = userSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { email, pass } = result.data
    let { name } = result.data
    name = validator.escape(validator.trim(name))

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
      { message: 'User registered successfully', user: { name: user.name } },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
