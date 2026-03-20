import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import QueryProvider from "@/providers/QueryProvider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

/* ─── Metadata ────────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: "Services Psychologist",
  description: "Psychologist services client application",
};

/* ─── Layout ──────────────────────────────────────────────────────────────── */

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ru" | "am")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <QueryProvider>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </QueryProvider>
  );
}
