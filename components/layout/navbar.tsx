"use client";

import LanguageSwitcher from "@/components/widgets/language-switcher";
import ThemeSwitcher from "@/components/widgets/theme-switcher";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-6">
      <nav className="mx-auto px-container md:px-16 flex items-center justify-between w-full">

        <span className="relative z-10 flex items-center gap-2 group text-xl sm:text-2xl font-black tracking-tighter uppercase text-foreground select-none cursor-default">
          Solmaz
        </span>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  );
}
