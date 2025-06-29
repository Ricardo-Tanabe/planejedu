"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-b border-gray-200 p-4 shadow-sm
    text-sm text-blue-500 text-center">
        <Link href={"/privacy-policy"} className="underline mx-2">
            Política de Privacidade
        </Link>
        <Link href={"/terms-of-service"} className="underline mx-2">
            Termos de Serviço
        </Link>
    </footer>
  )
}
