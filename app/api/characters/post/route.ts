import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const formData = await req.json()
    const name = formData.name as string
    const dexterity = formData.dexterity as number
    const vigor = formData.vigor as number
    const image = formData.image as string
    const armors = formData.armors || []
    const weapons = formData.weapons || []
    const talismans = formData.talismans || []
    const sorceries = formData.sorceries || []
    const incantations = formData.incantations || []
    const userId = formData.userId as string

    const characterBuild = await prisma.characterBuild.create({
      data: {
        name,
        dexterity,
        vigor,
        image,
        creatorId: Number(userId),
        armors: {
          create: armors.map((armor: { name: string; url: string }) => ({
            name: armor.name,
            url: armor.url,
          })),
        },
        weapons: {
          create: weapons.map((weapon: { name: string; url: string }) => ({
            name: weapon.name,
            url: weapon.url,
          })),
        },
        talismans: {
          create: talismans.map((talisman: { name: string; url: string }) => ({
            name: talisman.name,
            url: talisman.url,
          })),
        },
        sorceries: {
          create: sorceries.map((sorcery: { name: string; url: string }) => ({
            name: sorcery.name,
            url: sorcery.url,
          })),
        },
        incantations: {
          create: incantations.map(
            (incantation: { name: string; url: string }) => ({
              name: incantation.name,
              url: incantation.url,
            })
          ),
        },
      },
    })

    return NextResponse.json({ characterBuild }, { status: 201 })
  } catch (error) {
    console.error('Error creating character build:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
