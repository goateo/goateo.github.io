"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/methodology", label: "Methodology" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-[15px] tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            G
          </span>
          GoatEO
        </Link>

        {/* Product switcher */}
        <div className="flex rounded-lg bg-muted p-0.5 gap-0.5">
          <button className="rounded-md bg-card px-3 py-1 text-xs font-medium shadow-sm">
            AEO Audit
          </button>
          <button className="rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            Agent Eval
            <span className="ml-1.5 inline-flex items-center rounded-full bg-purple/10 px-1.5 py-0.5 text-[10px] font-semibold text-purple">
              Soon
            </span>
          </button>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                pathname === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/"
          className="rounded-lg bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Get your score
        </Link>
      </div>
    </header>
  );
}
