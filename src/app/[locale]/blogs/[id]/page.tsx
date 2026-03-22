import { setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import BlogDetail from "@/components/BlogDetail";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-16 px-6">
        <BlogDetail id={id} />
      </main>
      <SiteFooter />
    </div>
  );
}
