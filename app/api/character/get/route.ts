import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')

  try {
    const resp = await prisma.characterBuild.findUnique({
      where: {
        id: Number(id),
      },
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
