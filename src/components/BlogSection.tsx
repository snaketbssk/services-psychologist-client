import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimateIn from "@/components/AnimateIn";
import { getBlogs } from "@/lib/service-psychologist";
import type { IBlogShortDto } from "@/lib/service-psychologist";

export default async function BlogSection() {
  const t = await getTranslations("BLOG_SECTION");
  const locale = await getLocale();

  let blogs: IBlogShortDto[] = [];
  try {
    const res = await getBlogs({ PageNumber: 1, PageSize: 4 }, locale);
    blogs = res.data.values ?? [];
  } catch {
    blogs = [];
  }

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn variant="fade-up">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-subject text-sm font-medium tracking-widest uppercase mb-2">
              {t("EYEBROW")}
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              {t("HEADING")}
            </h2>
          </div>
          <Link
            href="/blogs"
            className="text-subject text-sm font-medium hover:underline shrink-0 hidden sm:block"
          >
            {t("VIEW_ALL")}
          </Link>
        </div>
        </AnimateIn>

        <div className="grid lg:grid-cols-4 gap-6">
          {blogs.map((blog, i) => (
            <AnimateIn key={blog.id} variant="fade-up" delay={i * 100}>
              <article className="h-full group">
                <Card className="relative overflow-hidden p-0 h-full transition-all duration-200 group-hover:shadow-lg group-hover:ring-subject/40">
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={blog.title}
                  />
                  <div className="relative aspect-video bg-muted flex items-center justify-center text-muted-foreground text-3xl select-none overflow-hidden">
                    📷 Blog Image
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg px-3 py-1 text-sm font-bold leading-tight">
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardContent className="pt-4 pb-4 flex flex-col flex-1">
                    <Badge variant="secondary" className="w-fit">{blog.category}</Badge>
                    <h3 className="font-heading font-semibold text-lg text-foreground mt-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="mt-4 pt-3 border-t border-border">
                      <span className="text-foreground text-sm font-semibold">
                        {t("READ_MORE")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </article>
            </AnimateIn>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blogs" className="text-subject text-sm font-medium hover:underline">
            {t("VIEW_ALL")}
          </Link>
        </div>
      </div>
    </section>
  );
}
