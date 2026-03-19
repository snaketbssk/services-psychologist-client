import type { ReactNode } from "react";
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Root layout is a pass-through. The [locale] layout below provides
// <html lang={locale}> and <body>, so no html/body tags here.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
