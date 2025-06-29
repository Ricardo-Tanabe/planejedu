import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { error: "Não autenticado" },
                { status: 401 }
            );
        }

        const themes = await prisma.theme.findMany({
            where: { userId: session.user.id },
        });

        return NextResponse.json(themes, { status: 200} );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
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
        const title: string = (data?.title || "").trim();

        if (!title) {
            return NextResponse.json(
                { error: "Título é obrigatório" },
                { status: 400 }
            );
        }

        const totalThemes = await prisma.theme.count({ where: { userId: session.user.id } });
        if (totalThemes >= 30) {
            return NextResponse.json(
                { error: "Limite máximo de 30 temas atingido." },
                { status: 403 }
            );
        }

        const newTheme = await prisma.theme.create({
            data: { title, userId: session.user.id }
        });

        return NextResponse.json(newTheme, { status: 201 });
    } catch {
        return NextResponse.json(
            { error: "Erro interno do servidor"},
            { status: 500}
        )
    }
}