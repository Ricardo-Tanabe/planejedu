import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"

type Params = { id: string };

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<Params>}
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: "ID é obrigatório" }, 
                { status: 400 }
            );
        }

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Não autenticado" }, 
                { status: 401 }
            );
        }

        const theme = await prisma.theme.findUnique({ where: { id } });
        if (!theme || theme.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Não encontrado" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(theme, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro interno" }, 
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<Params>}
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: "ID é obrigatório" }, 
                { status: 400 }
            );
        }

        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" }, 
                { status: 401 }
            );
        }

        const { title } = await req.json();
        if (!title || title.trim() === "") {
            return NextResponse.json(
                { error: "Título é obrigatório"},
                { status: 400 }
            );
        }

        const existing = await prisma.theme.findUnique({ where: { id } });
        if (!existing || existing.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Não encontrado" }, 
                { status: 404 }
            );
        }

        const updated = await prisma.theme.update({ 
            where: { id }, 
            data: { title } 
        });
        return NextResponse.json(updated, { status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro interno" }, 
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: "ID é obrigatório" }, 
                { status: 400 }
            );
        }

        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" }, 
                { status: 401 }
            );
        }

        const existing = await prisma.theme.findUnique({ where: { id } });
        if (!existing || existing.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Não encontrado" }, 
                { status: 404 }
            );
        }

        await prisma.topic.deleteMany({ where: { themeId: id } });
        await prisma.theme.delete({ where: { id } });

        return NextResponse.json(
            { sucess: true }, 
            { status: 200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Erro interno" }, 
            { status: 500 }
        );
    }
}