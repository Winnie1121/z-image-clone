"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, History, User } from "lucide-react";

interface HeaderProps {
  user?: {
    email?: string | null;
  } | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="hidden sm:inline">Z-Image Clone</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/history">
              <Button variant="ghost" size="sm" className="gap-2">
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </Button>
            </Link>

            {user ? (
              <Button variant="outline" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline max-w-[100px] truncate">
                  {user.email}
                </span>
              </Button>
            ) : (
              <Link href="/auth/signin">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
