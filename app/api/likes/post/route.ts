import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface PostRequest {
  json: () => Promise<{ characterBuildId: string; userId: string }>
}

interface ErrorResponse {
  message: string
}

export async function POST(req: PostRequest): Promise<Response> {
  try {
    const { characterBuildId, userId } = await req.json()
    const buildId = Number(characterBuildId)
    const user = Number(userId)

    const doesUserLikeExist = await prisma.characterBuildLike.findUnique({
      where: {
        userId_characterBuildId: { userId: user, characterBuildId: buildId },
      },
    })

    let num = 1

    if (doesUserLikeExist) {
      await prisma.characterBuildLike.delete({
        where: {
          userId_characterBuildId: { userId: user, characterBuildId: buildId },
        },
      })

      num = -1
    } else {
      await prisma.characterBuildLike.create({
        data: {
          userId: user,
          characterBuildId: buildId,
        },
      })
    }

    const updatedCharacter = await prisma.characterBuild.update({
      where: { id: buildId },
      data: { likes: { increment: num } },
      include: {
        weapons: true,
        armors: true,
        talismans: true,
        sorceries: true,
        incantations: true,
      },
    })

    return new Response(JSON.stringify(updatedCharacter), { status: 200 })
  } catch (error) {
    console.error('Error toggling like:', error)
    const errorResponse: ErrorResponse = { message: 'Internal server error' }
    return new Response(JSON.stringify(errorResponse), { status: 500 })
  }
}
