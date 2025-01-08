"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isRequirementsActive = pathname.includes("/requirements");
  const isDocumentsActive = pathname.includes("/documents");

  return (
    <div className="h-14 flex items-center justify-end p-4 bg-slate-500 sticky top-0 z-10">
      <div className="space-x-2">
        <Link
          href="/requirements"
          className={cn(isRequirementsActive ? "text-white" : "text-white/45")}
        >
          Requirements
        </Link>
        <Link
          href="/documents"
          className={cn(isDocumentsActive ? "text-white" : "text-white/45")}
        >
          Documents
        </Link>
      </div>
    </div>
  );
}
