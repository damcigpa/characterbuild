import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const resp = await prisma.characterBuild.findMany({
      include: {
        armors: true,
        weapons: true,
        talismans: true,
        sorceries: true,
        incantations: true,
      },
    })

    return NextResponse.json({ character: resp })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch character builds' },
      { status: 500 }
    )
  }
}
