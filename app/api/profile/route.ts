import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const prisma = new PrismaClient();
    const characterBuilds = await prisma.characterBuild.findMany({
      where: {
        creatorId: parseInt(userId),
      },
      include: {
        armors: true,
        weapons: true,
        talismans: true,
        sorceries: true,
        incantations: true,
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

    // Return the list of character builds
    return NextResponse.json({ characterBuilds })
  } catch (error) {
    console.error('Error fetching character builds:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
