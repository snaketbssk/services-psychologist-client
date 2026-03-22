import { setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import BlogList from "@/components/BlogList";
import SiteFooter from "@/components/SiteFooter";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-16 px-6">
        <BlogList />
      </main>
      <SiteFooter />
    </div>
  );
}
