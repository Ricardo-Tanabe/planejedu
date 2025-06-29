"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/outline"

type Topic = {
  id: string
  title: string
  content?: string
  completed: boolean
  createdAt: string
  themeId: string
}

export default function ThemePage() {
    const { id: themeId } = useParams() as { id: string };
    const [topics, setTopics] = useState<Topic[]>([]);
    const [themeTitle, setThemeTitle] = useState<string>("");
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchTheme = useCallback(async () => {
        try {
            const res = await fetch(`/api/themes/${themeId}`);
            if (!res.ok) throw new Error();
            const theme = await res.json();
            setThemeTitle(theme.title);
        } catch {
            setError("Não foi possível carregar o tema.");
        }
    }, [themeId]);

    const fetchTopics = useCallback(async () => {
        try {
            setError(null);
            const res = await fetch(`/api/topics`);
            if (!res.ok) throw new Error();
            const allTopics = await res.json();
            setTopics(allTopics.filter((t: Topic) => t.themeId === themeId));
        } catch {
            setError("Não foi possível carregar os tópicos.");
        }
    }, [themeId]);

    useEffect(() => {
        fetchTheme();
        fetchTopics();
    }, [fetchTheme, fetchTopics])

    async function addTopic() {
        if (!newTitle.trim()) {
            setError("Título do tópico não pode estar vazio")
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/topics", {
                method: "POST",
                body: JSON.stringify({ title: newTitle, content: newContent, themeId }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error("Erro ao criar tópico.");
            setNewTitle("");
            setNewContent("");
            fetchTopics();

        } catch {
            setError("Não foi possível criar o tópico")
        } finally {
            setLoading(false);
        }
    }

    async function saveTopic() {
        if (!editingTopic) return;
        
        if (!editingTopic.title.trim()) {
            setError("O título não pode estar vazio.");
            return;
        }
        
        setLoading(true);

        try {
            const res = await fetch(`/api/topics/${editingTopic.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: editingTopic.title,
                    content: editingTopic.content,
                    completed: editingTopic.completed
                }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error("Erro ao atualizar o tópico");
            setEditingTopic(null);
            fetchTopics();

        } catch {
            setError("Não foi possível salvar o tópico.")
        } finally {
            setLoading(false);
        }
    }

    async function deleteTopic(id: string) {
        if (!confirm("Excluir este tópico?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/topics/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erro ao excluir o tópico.");
            fetchTopics();
        } catch {
            setError("Não foi possível excluir o tópico.");
        } finally {
            setLoading(false);
        }
    }

    async function toggleComplete(topic: Topic) {
        setLoading(true);
        try {
            const res = await fetch(`/api/topics/${topic.id}`, {
                method: "PUT",
                body: JSON.stringify({ completed: !topic.completed }),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error();
            fetchTopics();
        } catch {
            setError("Não foi possível atualizar o status do tópico.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-2xl mb-4 text-gray-800 max-sm:text-lg">Tópicos do tema: {themeTitle}</h1>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <div className="flex flex-col mb-4 gap-2">
                <input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded text-gray-600 placeholder:text-gray-400
                    focus:outline-none focurs:ring-2 focus:ring-blue-500"
                    placeholder="Título do tópico"
                    maxLength={100}
                    disabled={loading}
                />
                <textarea
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    rows={4}
                    className="border border-gray-300 p-2 rounded text-gray-600 placeholder:text-gray-400
                    focus:outline-none focurs:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Descrição"
                    maxLength={500}
                    disabled={loading}
                />
                <button
                    onClick={addTopic}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex justify-center gap-2">
                            <span>Adicionando</span>
                            <ArrowPathIcon className="w-6 h-6 animate-spin"/>
                        </div>
                    ) : (
                        <>
                        <span>Adicionar</span>
                        </>
                    )}
                </button>
            </div>

            <ul className="space-y-2">
                {topics.map(t => (
                    <li key={t.id} className="bg-white p-3 rounded shadow flex flex-col hover:shadow-md
                    transition">
                        {editingTopic?.id === t.id ? (
                            <>
                            <input
                                value={editingTopic.title}
                                onChange={e => setEditingTopic({ ...editingTopic, title: e.target.value })}
                                className="border p-2 mb-2 text-gray-700 rounded focus:outline-none
                                focus:ring-2 focus:ring-blue-500"
                                maxLength={100}
                                disabled={loading}
                            />
                            <textarea
                                value={editingTopic.content || ""}
                                onChange={e => setEditingTopic({ ...editingTopic, content: e.target.value })}
                                rows={2}
                                className="border p-2 mb-2 text-gray-700 rounded focus:outline-none
                                focus:ring-2 focus:ring-blue-500"
                                maxLength={500}
                                disabled={loading}
                            />
                            <button
                                onClick={saveTopic}
                                className="bg-green-600 text-white px-3 py-1 rounded mb-2
                                hover:bg-green-700 transition disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex justify-center gap-2">
                                        <span>Salvando</span>
                                        <ArrowPathIcon className="w-6 h-6 animate-spin"/>
                                    </div>
                                ) : (
                                    <>Salvar</>
                                )}
                            </button>
                            </>
                        ) : (
                            <>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => toggleComplete(t)}
                                    className="mr-2 cursor-pointer"
                                    disabled={loading}
                                />
                                <h2 className={t.completed ? "line-through text-gray-500" : "text-gray-800"}>
                                    {t.title}
                                </h2>
                            </div>
                            {t.content && <p className="text-sm text-gray-500 mt-1">
                                {t.content}
                            </p>}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={() => setEditingTopic(t)}
                                    className="text-blue-600 hover:underline hover:text-blue-700"
                                    disabled={loading}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteTopic(t.id)}
                                    className="text-red-600 hover:underline hover:text-red-700"
                                    disabled={loading}
                                >
                                    Excluir
                                </button>
                            </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    )
}