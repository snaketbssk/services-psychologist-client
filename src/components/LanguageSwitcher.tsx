"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const switchTo = (newLocale: string) =>
    pathname.replace(`/${locale}`, `/${newLocale}`);

  return (
    <div className="flex items-center gap-3 text-sm text-gray-500">
      <Link
        href={switchTo("en")}
        className={`px-3 py-1 rounded-full border transition-colors ${
          locale === "en"
            ? "border-indigo-600 text-indigo-600 font-semibold"
            : "border-gray-300 hover:border-gray-500 hover:text-gray-700"
        }`}
      >
        EN
      </Link>
      <Link
        href={switchTo("ru")}
        className={`px-3 py-1 rounded-full border transition-colors ${
          locale === "ru"
            ? "border-indigo-600 text-indigo-600 font-semibold"
            : "border-gray-300 hover:border-gray-500 hover:text-gray-700"
        }`}
      >
        RU
      </Link>
    </div>
  );
}
