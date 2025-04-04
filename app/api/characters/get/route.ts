import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const userId = searchParams.get('userId') 

  try {
    const characterBuilds = await prisma.characterBuild.findMany({
      include: {
        armors: true,
        weapons: true,
        talismans: true,
        sorceries: true,
        incantations: true,
        likedBy: true, 
      },
    })

    const result = characterBuilds.map((characterBuild) => {
      const userLiked = characterBuild.likedBy.some(
        (like) => like.userId === Number(userId)
      )

      return {
        ...characterBuild,
        userLiked, 
      }
    })

    return NextResponse.json({ characters: result })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch character builds' },
      { status: 500 }
    )
  }
}
