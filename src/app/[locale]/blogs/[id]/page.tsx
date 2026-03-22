import { setRequestLocale } from "next-intl/server";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import BlogDetail from "@/components/BlogDetail";
import SiteFooter from "@/components/SiteFooter";
import { getBlogById } from "@/lib/service-psychologist";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const currentLocale = await getLocale();

  try {
    const res = await getBlogById(id, currentLocale);
    const blog = res.data;

    return (
      <div className="bg-background min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 py-16 px-6">
          <BlogDetail blog={blog} />
        </main>
        <SiteFooter />
      </div>
    );
  } catch (error: unknown) {
    const status = (error as { response?: { status?: number } })?.response?.status;
    if (status === 404) notFound();
    throw error;
  }
}
