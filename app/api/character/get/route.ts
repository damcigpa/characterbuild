import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const uId = searchParams.get('userId')

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
        likedBy: true,
        comments: {
          include: {
            commenter: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    const characterComments = resp?.comments.filter((comment) => {
      return comment.id === Number(id)
    })

    const userLiked = resp?.likedBy[0]?.userId === Number(uId) ? true : false

    return NextResponse.json({...resp, userLiked, characterComments}, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch character builds' },
      { status: 500 }
    )
  }
}
