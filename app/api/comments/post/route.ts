import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('Request body:', body)
  const { commenterId, comment, characterBuildId } = body

  if (!commenterId || !comment || !characterBuildId) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        commenter: {
          connect: { id: commenterId },
        },
        comment,
        characterBuild: {
          connect: { id: characterBuildId },
        },
      },
      include: {
        commenter: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(
      { characterBuildId, comment: newComment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
