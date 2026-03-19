import type { ReactNode } from "react";

// Root layout is a pass-through. The [locale] layout provides <html> and <body>.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
