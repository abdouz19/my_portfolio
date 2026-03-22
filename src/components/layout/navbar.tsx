"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { navigationItems } from "@/lib/constants/navigation";
import { useScrollSpy } from "@/lib/hooks/use-scroll-spy";

const sectionIds = ["about", "projects", "skills", "journey", "contact"];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const activeSection = useScrollSpy(sectionIds);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <button
            onClick={() => scrollTo("#hero")}
            className="text-xl font-bold text-accent-blue focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="Scroll to top"
          >
            MAZ
          </button>

          <div className="hidden items-center gap-6 md:flex">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-ring rounded px-1",
                  activeSection === item.href.slice(1)
                    ? "text-accent-blue"
                    : "text-muted",
                )}
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => scrollTo("#contact")}
              className="rounded-full"
            >
              Contact Me
            </Button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-muted transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {isOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={cn(
                    "text-left text-sm font-medium transition-colors hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1",
                    activeSection === item.href.slice(1)
                      ? "text-accent-blue"
                      : "text-muted",
                  )}
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollTo("#contact")}
                className="rounded-full w-fit"
              >
                Contact Me
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
