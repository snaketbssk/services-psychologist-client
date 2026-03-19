"use client";

import { useT } from "@/i18n/useT";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HomePage() {
  const t = useT();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t.welcome}
        </h1>

        <p className="text-xl text-gray-500 italic">{t.tagline}</p>

        <p className="text-lg leading-8 text-gray-600">{t.description}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors">
            {t.bookSession}
          </button>
          <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
            {t.learnMore}
          </button>
        </div>

        <nav className="flex gap-6 justify-center text-sm text-gray-500 pt-2">
          <a href="#" className="hover:text-gray-900">{t.home}</a>
          <a href="#" className="hover:text-gray-900">{t.about}</a>
          <a href="#" className="hover:text-gray-900">{t.contact}</a>
        </nav>

        <LanguageSwitcher />
      </div>
    </main>
  );
}
