"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        setError(null);

        if (!email.trim() || !password.trim()) {
            setError("Preencha todos os campos");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            })

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data?.error || "Erro ao cadastrar")
            }

            router.push("/auth/login")
        } catch {
            setError("Erro inesperado");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Criar Conta</h1>

                {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

                <input
                    className="w-full border border-gray-300 p-2 mb-2 rounded text-gray-400
                    placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={loading}
                />
                <input
                    className="w-full border border-gray-300 p-2 mb-4 rounded text-gray-400
                    placeholder:text-gray-300 focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
                <button
                    onClick={handleRegister}
                    className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Já tem conta?{" "}
                    <Link href="/auth/login" className="text-blue-600 hover:underline">
                        Entrar
                    </Link>
                </p>
            </div>
        </main>
    )
}