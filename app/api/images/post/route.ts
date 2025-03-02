import { revalidatePath } from 'next/cache'
import fs from 'node:fs/promises'
import crypto from 'crypto'
import { extname } from 'path'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    const fileExt = extname(file.name) // Get the file extension
    const newFileName = `${crypto.randomUUID()}${fileExt}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    await fs.writeFile(`./public/upload/${newFileName}`, buffer)

    revalidatePath('/')
    return new Response(JSON.stringify({ fileName: newFileName }), {
      status: 200,
    })
  } catch (e) {
    console.error(e)
    return new Response(null, { status: 500 })
  }
}
