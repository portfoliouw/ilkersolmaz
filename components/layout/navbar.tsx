"use client";

import { useState } from "react";
import { Timer } from "lucide-react";
import LanguageSwitcher from "@/components/widgets/language-switcher";
import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { TimerModal } from "@/components/modals/timer-modal";

export default function Navbar() {
  const [timerOpen, setTimerOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-6">
        <nav className="mx-auto px-container md:px-16 flex items-center justify-between w-full">

          <span className="relative z-10 flex items-center gap-2 group text-xl sm:text-2xl font-black tracking-tighter uppercase text-foreground select-none cursor-default">
            Solmaz
          </span>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setTimerOpen(true)}
              aria-label="YKS Geri Sayım"
              className="group relative flex h-10 cursor-pointer items-center gap-2 px-3 sm:px-3.5 overflow-hidden rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-foreground transition-all duration-500 hover:bg-foreground hover:text-background hover:border-foreground/30 shadow-sm focus:outline-none select-none"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-13 group-hover:duration-1000 group-hover:translate-x-full pointer-events-none">
                <div className="relative h-full w-4 bg-background/20 dark:bg-background/20" />
              </div>

              <span className="relative z-10 flex items-center justify-center">
                <Timer className="h-4 w-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              </span>

            </button>

            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </nav>
      </header>

      <TimerModal open={timerOpen} onOpenChange={setTimerOpen} />
    </>
  );
}

