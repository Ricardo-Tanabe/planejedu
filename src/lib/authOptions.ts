 import { NextAuthOptions } from "next-auth"
 import Credentials from "next-auth/providers/credentials"
 import GoogleProvider from "next-auth/providers/google";
 import { prisma } from "@/lib/prisma"
 import bcrypt from "bcrypt"

 if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET não está configurado nas variáveis de ambiente");
 }

 if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET devem ser configurados nas variáveis de ambiente");
 }

 export const authOptions: NextAuthOptions = {
    pages: { signIn: "/auth/login" },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email e senha são obrigatórios");
                }

                const email = credentials.email.toLowerCase().trim()
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || !user.password) {
                    throw new Error("Usuário não encontrado");
                }

                const isValid = await bcrypt.compare( credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Senha incorreta")
                }

                return { id: user.id, email: user.email };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const email = user.email;
                if(!email) return false;

                let existingUser = await prisma.user.findUnique({ where: { email } });

                if (!existingUser) {
                    existingUser = await prisma.user.create({
                        data: { email }
                    });
                }

                (user as { id: string }).id = existingUser.id;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as { id: string }).id;
            } else if (!token.id && token.email) {
                const dbUser = await prisma.user.findUnique({ where: { email: token.email as string } })
                if (dbUser) token.id = dbUser.id
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.id = token.id as string;
            return session;
        }
    }
 }