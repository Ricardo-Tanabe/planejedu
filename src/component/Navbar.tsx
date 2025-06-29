"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { HomeIcon, BookOpenIcon, PowerIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const { data: session, status } = useSession();

    if (status !== "authenticated") return null;

    return (
        <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
            <div className="flex gap-4">
                <Link href={"/"} className="hover:underline max-xs:hidden">Início</Link>
                <Link href={"/"} className="hover:underline w-5 h-5 xs:hidden">
                    <HomeIcon className="" />
                </Link>
                <Link href={"/themes"} className="hover:underline max-xs:hidden">Temas</Link>
                <Link href={"/themes"} className="hover:underline w-5 h-5 xs:hidden">
                    <BookOpenIcon className="" />
                </Link>
            </div>

            <div className="flex items-center gap-2">
                <span className="max-xs:hidden">{session?.user?.email}</span>
                <button
                    onClick={() => signOut()}
                    className="bg-blue-800 px-2 py-1 rounded hover:bg-blue-900"
                >
                    <span className="max-xs:hidden">Sair</span>
                    <PowerIcon className="w-5 h-5 xs:hidden" />
                </button>
            </div>
        </nav>
    );
}