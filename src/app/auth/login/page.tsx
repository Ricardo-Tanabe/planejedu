"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setError(null);

        if(!email.trim() || !password.trim()) {
            setError("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            })
            if (result?.ok) {
                router.push("/");
            } else {
                setError("Credenciais inválidas!")
            }
        } catch {
            setError("Erro ao autenticar. Tente novamente.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 rounded shadow w-80">
                <h1
                    className="text-2xl mb-4 text-center text-gray-800 font-semibold"
                >
                    Login
                </h1>
                
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <input
                    className="border p-2 w-full mb-2 text-gray-400 placeholder:text-gray-300
                    rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    maxLength={100}
                    disabled={loading}
                />

                <input
                    className="border p-2 w-full mb-4 text-gray-400 placeholder:text-gray-300
                    rounded focus-outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    minLength={6}
                    maxLength={64}
                    disabled={loading}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700
                    trnasition disabled:opacity-50"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>

                <button
                    onClick={() => signIn("google")}
                    disabled={loading}
                    className="bg-red-500 text-white w-full p-2 mt-2 rounded hover:bg-red-600 transition disabled:opacity-50"
                >
                    Entrar no Google
                </button>
                
                <p className="text-center mt-4 text-sm text-gray-600">
                    Não possui conta?{" "}
                    <Link href="/auth/register" className="text-blue-600 hover:underline">
                        Registrar
                    </Link>
                </p>
            </div>
        </main>
    )
}