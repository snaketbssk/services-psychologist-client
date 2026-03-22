import { setRequestLocale } from "next-intl/server";
import { getLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import BlogList from "@/components/BlogList";
import SiteFooter from "@/components/SiteFooter";
import { getBlogs } from "@/lib/service-psychologist";

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentLocale = await getLocale();
  let blogs: Awaited<ReturnType<typeof getBlogs>>["data"]["values"] = [];

  try {
    const res = await getBlogs({ PageNumber: 1, PageSize: 50 }, currentLocale);
    blogs = res.data.values ?? [];
  } catch {
    blogs = [];
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-16 px-6">
        <BlogList blogs={blogs} />
      </main>
      <SiteFooter />
    </div>
  );
}
