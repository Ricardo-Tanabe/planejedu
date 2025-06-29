"use client"

import { useEffect, useState } from "react";
import Link from "next/link"
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  PlusIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline"

type Theme = {
  id: string;
  title: string;
}

export default function Home() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchThemes() {
    try {
      setError(null);
      const res = await fetch("/api/themes");
      if (!res.ok) throw new Error(); 
      const data = await res.json();
      setThemes(data);
    } catch {
      setError("Não foi possível carregar os temas.")
    }
  }

  async function addTheme() {
    if (!newTitle.trim()) {
      setError("Informe um título para o tema.")
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/themes", {
        method: "POST",
        body: JSON.stringify({ title: newTitle }),
        headers: { "Content-Type": "application/json" }
      })
  
      if (!res.ok) throw new Error();
      setNewTitle("");
      fetchThemes();
    } catch {
      setError("Não foi possível adicionar o tema.");
    } finally {
      setLoading(false);
    }
  }

  async function updateTheme(id: string, title: string) {
    if (!title.trim()) {
      setError("O título não pode estar vazio.");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`/api/themes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title }),
        headers: { "Content-Type": "application/json" }
      });
  
      if(!res.ok) throw new Error();
      setEditingTheme(null);
      fetchThemes();
    } catch {
      setError("Não foi possível editar o tema.")
    } finally {
      setLoading(false);
    }
  }

  async function deleteTheme(id: string) {
    if (!confirm("Tem certeza que quer excluir?")) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/themes/${id}`, { method: "DELETE" });
  
      if(!res.ok) throw new Error(); 
      fetchThemes();
    } catch {
      setError("Não foi possível excluir o tema.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchThemes() }, [])

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 max-sm:text-2xl">Meus Temas</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex mb-4 sm:gap-2">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border border-gray-300 p-2 flex-1 text-gray-600 placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          sm:rounded max-sm:rounded-l-md"
          placeholder="Novo tema"
          minLength={1}
          maxLength={100}
          disabled={loading}
        />
        <button
          onClick={addTheme}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer hover:bg-blue-700
          hover:text-gray-100 transition disabled:opacity-50
          sm:rounded max-sm:rounded-r-md max:sm:border-l-none"
        >
          {loading ? (
            <>
            <span className="max-sm:hidden">Aguarde...</span>
            <ArrowPathIcon className="w-6 h-6 animate-spin sm:hidden"/>
            </>
          ) : (
            <>
            <span className="max-sm:hidden">Adicionar</span>
            <PlusIcon className="w-6 h-6 sm:hidden"/>
            </>
          )}
        </button>
      </div>
      <ul className="space-y-2">
        {themes.map((theme) => (
          <li
            key={theme.id}
            className="bg-white p-3 rounded shadow flex items-center justify-between hover:shadow-md
            transition"
          >
            {editingTheme?.id === theme.id ? (
              <input
                value={editingTheme.title}
                onChange={e => setEditingTheme({ ...editingTheme, title: e.target.value })}
                className="border p-1 flex-1 text-gray-700 rounded focus:outline-none focus:ring-2
                focus:ring-blue-500"
                minLength={1}
                maxLength={100}
              />
            ) : (
              <Link
                href={`/themes/${theme.id}`}
                className="text-gray-700 hover:underline flex-1"
              >
                {theme.title}
              </Link>
            )}

            <div className="flex gap-2 ml-2">
              {editingTheme?.id === theme.id ? (
                <button
                  onClick={() => updateTheme(theme.id, editingTheme.title)}
                  disabled={loading}
                  className={`${loading ? "text-gray-600" : "text-green-600 hover:text-green-700"}
                  cursor-pointer hover:underline`}
                >
                  <span className="max-sm:hidden">Salvar</span>
                  <CheckCircleIcon className="w-6 h-6 sm:hidden" />
                </button>
              ) : (
                <button
                  onClick={() => setEditingTheme(theme)}
                  disabled={loading}
                  className={`${loading ? "text-gray-600" : "text-blue-600 hover:text-blue-700" }
                  cursor-pointer hover:underline`}
                >
                  <span className="max-sm:hidden">Editar</span>
                  <PencilSquareIcon className="w-6 h-6 sm:hidden" />
                </button>
              )}
              <button
                  onClick={() => deleteTheme(theme.id)}
                  disabled={loading}
                  className={`${loading ? "text-gray-600" : "text-red-600 hover:text-red-700"}
                  cursor-pointer hover:underline`}
              >
                <span className="max-sm:hidden">Excluir</span>
                <TrashIcon className="w-6 h-6 sm:hidden" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
