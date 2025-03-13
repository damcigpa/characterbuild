import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface PostRequest {
    json: () => Promise<{ id: string }>
}

interface ErrorResponse {
    message: string
}

export async function POST(req: PostRequest): Promise<Response> {
    try {
        const { id } = await req.json()
        const reqId = Number(id)
        
        const updatedCharacter = await prisma.characterBuild.update({
            where: { id: reqId },
            data: { likes: { increment: 1 } },
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
        console.error('Error updating likes:', error)
        const errorResponse: ErrorResponse = { message: 'Internal server error' }
        return new Response(JSON.stringify(errorResponse), {
            status: 500,
        })
    }
}
