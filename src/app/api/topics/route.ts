import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado"},
                { status: 401 }
            );
        }

        const themeId = req.nextUrl.searchParams.get("themeId");
        const topics = await prisma.topic.findMany({
            where: themeId ? { themeId } : {},
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(topics);
    } catch (error) {
        console.error("[GET /api/topics]", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const data = await req.json();
        const { title, content, themeId } = data;

        if (!title || !themeId) {
            return NextResponse.json(
                { error: "Campos obrigatórios: title, themeId" },
                { status: 400 }
            )
        }

        const totalTopics = await prisma.topic.count({ where: { themeId } });
        if (totalTopics >= 50) {
            return NextResponse.json(
                { error: "Limite máximo de 50 tópicos para este tema." },
                { status: 403 }
            );
        }

        const newTopic = await prisma.topic.create({
            data: {title, content, themeId}
        });

        return NextResponse.json(newTopic, { status: 201 });
    } catch (error) {
        console.error("[POST /api/topics]", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        )
    }
}