"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useMemo } from "react";
import Spinner from "@/component/Spinner";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const isPublicRoute = useMemo(() => {
        return pathname.startsWith("/auth") ||
               pathname === "/privacy-policy" ||
               pathname === "/terms-of-service";
    }, [pathname])
    
    useEffect(() => {
        if (status === "authenticated" && pathname.startsWith("/auth")) {
            router.push("/");
        }

        if (status === "unauthenticated" && !isPublicRoute) {
            router.push("/auth/login");
        }
    }, [status, pathname, router, isPublicRoute]);

    if (status === "loading" && !isPublicRoute) return <Spinner />;

    if (status === "unauthenticated" && !isPublicRoute) return null;

    return <>{children}</>
}