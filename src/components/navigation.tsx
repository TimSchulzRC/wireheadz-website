"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { asLink, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocales } from "./locales-wrapper";

export default function Navigation({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [locales] = useLocales();
  const { lang } = useParams<{ lang: string }>();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-6 md:px-12">
        {isFilled.image(settings.data.logo) && (
          <div className="mr-4 flex h-full">
            <Link
              href={"/" + lang}
              className="flex items-center space-x-2 h-full py-2"
            >
              <PrismicNextImage
                field={settings.data.logo}
                className="h-full w-auto"
              />
            </Link>
          </div>
        )}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6">
            {settings.data.navigation?.map((navItem, index) =>
              navItem.navigation_item?.length === 1 ? (
                isFilled.link(navItem.navigation_item[0]) && (
                  <PrismicNextLink
                    key={navItem.navigation_item[0].key}
                    field={navItem.navigation_item[0]}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === asLink(navItem.navigation_item[0])
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                )
              ) : (
                <DropdownMenu key={`${index}-${navItem.label}`}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary p-0",
                        "text-muted-foreground"
                      )}
                    >
                      {navItem.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {navItem.navigation_item?.map(
                      (item) =>
                        isFilled.link(item) && (
                          <DropdownMenuItem key={item.key} asChild>
                            <PrismicNextLink
                              field={item}
                              className={cn("w-full")}
                            />
                          </DropdownMenuItem>
                        )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            )}
          </nav>
          <div className="flex items-center space-x-2">
            {settings.data.buttons.map(
              (item) =>
                isFilled.link(item) && (
                  <Button
                    key={item.key}
                    variant={item.variant}
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.text}
                  </Button>
                )
            )}
          </div>
          <LanguageSwitcher locales={locales} />
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
        <div className="container pb-4 px-6 md:hidden">
          <nav className="flex flex-col space-y-3">
            {settings.data.navigation?.map((navItem) =>
              navItem.navigation_item?.length === 1 ? (
                isFilled.link(navItem.navigation_item[0]) && (
                  <PrismicNextLink
                    key={navItem.navigation_item[0].key}
                    field={navItem.navigation_item[0]}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === asLink(navItem.navigation_item[0])
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                )
              ) : (
                <div className="pt-2">
                  <div className="mb-2 font-medium text-sm">
                    {navItem.label}
                  </div>
                  <div className="flex flex-col space-y-2 pl-4">
                    {navItem.navigation_item?.map((item) => (
                      <PrismicNextLink
                        key={item.key}
                        field={item}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
            <div className="flex flex-col space-y-2 pt-2">
              {settings.data.buttons.map(
                (item) =>
                  isFilled.link(item) && (
                    <Button
                      key={item.key}
                      variant={item.variant}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.text}
                    </Button>
                  )
              )}
            </div>
          </nav>
          <LanguageSwitcher locales={locales} />
        </div>
      )}
    </header>
  );
}
