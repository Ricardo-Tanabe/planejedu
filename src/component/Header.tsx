"use client";

import Link from "next/link";
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo PlanejEdu"
          width={200}
          height={200}
          className="max-sm:hidden"
          priority
        />
        <span className="text-2xl font-bold text-orange-500 max-sm:text-lg sm:hidden">
          PlanejEdu
        </span>
      </Link>
    </header>
  )
}
