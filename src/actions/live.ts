"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function createLiveClass(data: {
    title: string,
    description: string,
    subject: string,
    youtubeId: string,
    tags: string
}) {
    const session = await auth()
    if (!session || !session.user || (session.user as any).role !== "teacher") {
        throw new Error("Unauthorized")
    }

    const liveClass = await prisma.liveClass.create({
        data: {
            title: data.title,
            description: data.description,
            subject: data.subject,
            youtubeId: data.youtubeId,
            videoId: data.youtubeId, // Storing twice for compatibility/future diff
            status: "live",
            startTime: new Date(),
            instructorId: session.user.id,
            tags: data.tags,
            attendees: 0
        }
    })

    revalidatePath("/live-classes")
    return liveClass
}

export async function getLiveClass(id: string) {
    const liveClass = await prisma.liveClass.findUnique({
        where: { id },
        include: {
            instructor: {
                select: { name: true, image: true }
            }
        }
    })
    return liveClass
}

export async function endLiveClass(id: string) {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    // Verify ownership
    const liveClass = await prisma.liveClass.findUnique({ where: { id } })
    if (liveClass?.instructorId !== session.user.id) {
        throw new Error("Unauthorized")
    }

    await prisma.liveClass.update({
        where: { id },
        data: { status: "ended" }
    })

    revalidatePath("/live-classes")
    revalidatePath(`/live-classes/${id}`)
}
