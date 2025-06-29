"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Theme = {
    id: string;
    title: string;
}

export default function ThemesPage() {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function fetchThemes() {
        try {
            setError(null);
            const res = await fetch("/api/themes");
            if (!res.ok) throw new Error("Erro ao carregar temas")
                setThemes(await res.json());
        } catch {
            setError("Não foi possível carregar os temas")
        }
    }

    async function addTheme() {
        if (!title.trim()) {
            setError("Digite um nome para o tema")
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/themes", {
                method: "POST",
                body: JSON.stringify({ title }),
                headers: { "Content-Type": "application/json" },
            })

            if(!res.ok) throw new Error("Erro ao criar tema");
            setTitle("");
            fetchThemes();
        } catch {
            setError("Não foi possível criar o tema")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchThemes(); }, []);

    return (
        <main className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl mb-4 text-gray-800 font-semibold">Seus Temas</h1>
            {error  && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex mb-4 gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Novo tema"
                    className="border p-2 flex-1 rounded text-gray-600 placeholder:text-gray-400
                    focur:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    minLength={1}
                    maxLength={100}
                    disabled={loading}
                />
                <button
                    onClick={addTheme}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition
                    disabled:opacity-50"
                >
                    {loading ? "Criando..." : "Criar"}
                </button>
            </div>
            <ul className="space-y-2">
                {themes.map((theme) => (
                    <li key={theme.id} className="bg-white p-3 rounded shadow hover:shadow-md transition">
                        <Link href={`/themes/${theme.id}`} className="text-blue-700 underline hover:text-blue-800">
                            {theme.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}