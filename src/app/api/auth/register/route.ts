import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const email = (data?.email || "").trim().toLowerCase();
        const password = (data?.password || "").trim();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Informe e-mail e senha" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json(
                { error: "E-mail já cadastrado" },
                { status: 400 }
            );
        }
        
        const totalUsers = await prisma.user.count();
        if (totalUsers >= 10) {
            return NextResponse.json(
                { error: "Limite máximo de 10 usuários atingido."},
                { status: 403}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return NextResponse.json(
            { id: newUser.id, email: newUser.email },
            { status: 201 }
        );
    } catch (error) {
        console.error("[POST /api/auth/register] Erro:", error);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}