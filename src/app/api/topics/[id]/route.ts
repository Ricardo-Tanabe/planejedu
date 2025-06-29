import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"

type Params = { id: string };

type TopicUpdate = {
    title?: string;
    content?: string;
    completed?: boolean;
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" }, 
                { status: 401 }
            );
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: "ID do tópico não fornecido" }, 
                { status: 400 }
            );
        }

        const data = await req.json()
        const { title, content, completed } = data;

        const updatedFields: TopicUpdate = {};
        if (title !== undefined) updatedFields.title = title;
        if (content !== undefined) updatedFields.content = content;
        if (completed !== undefined) updatedFields.completed = completed;

        if (Object.keys(updatedFields).length === 0) {
            return NextResponse.json(
                { error: "Nenhum campo para atualizar" }, 
                { status: 400 }
            );
        }

        const updatedTopic = await prisma.topic.update({
            where: { id },
            data: updatedFields,
        });

        return NextResponse.json(updatedTopic, { status: 200 });
    } catch (error) {
        console.error("[PUT /api/topics/[id]]", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" }, 
                { status: 401 }
            );
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: "ID do tópico não fornecido" }, 
                { status: 400 }
            );
        }

        await prisma.topic.delete({ where: { id } });

        return NextResponse.json(
            { success: true }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("[DELETE /api/topics/[id]]", error);
        return NextResponse.json(
            { error: "Erro interno no servidor" },
            { status: 500 }
        );
    }
}