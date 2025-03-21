"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const mainNav = [
  { name: "Startseite", href: "/" },
  { name: "Spiele", href: "/spiele" },
  { name: "News", href: "/news" },
  { name: "Events", href: "/events" },
];

const leistungenNav = [
  { name: "Leistungen", href: "/leistungen" },
  { name: "Lehre", href: "/leistungen/lehre" },
  { name: "Forschung", href: "/leistungen/forschung" },
  {
    name: "Unternehmenskooperation",
    href: "/leistungen/unternehmenskooperation",
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              WireHeadZ
            </span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary p-0",
                    pathname.includes("/leistungen")
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  Leistungen
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {leistungenNav.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "w-full",
                        pathname === item.href && "font-medium text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="secondary">Anmelden</Button>
            <Button>Beitreten</Button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button
            variant="ghost"
            className="h-10 w-10 p-0"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Menü öffnen</span>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="container pb-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Leistungen
              </p>
              <div className="flex flex-col space-y-2 pl-4">
                {leistungenNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="secondary">Anmelden</Button>
              <Button>Beitreten</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
