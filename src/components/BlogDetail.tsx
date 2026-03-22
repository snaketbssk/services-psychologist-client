import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import AnimateIn from "@/components/AnimateIn";
import type { IBlogDto } from "@/lib/service-psychologist";

interface BlogDetailProps {
  blog: IBlogDto;
}

export default async function BlogDetail({ blog }: BlogDetailProps) {
  const tDetail = await getTranslations("BLOG_DETAIL");

  const paragraphs = blog.content.split("\n\n").filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto">
      <AnimateIn variant="fade-up">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1 text-subject text-sm font-medium hover:underline mb-8"
        >
          ← {tDetail("BACK_TO_BLOG")}
        </Link>

        <div className="mt-6">
          <Badge variant="secondary" className="mb-4">
            {blog.category}
          </Badge>

          <h1 className="font-heading text-4xl font-bold text-foreground leading-tight mb-3">
            {blog.title}
          </h1>

          <p className="text-muted-foreground text-sm mb-8">
            {new Date(blog.date).toLocaleDateString()} · {tDetail("READ_TIME")}
          </p>
        </div>
      </AnimateIn>

      <AnimateIn variant="fade-up" delay={100}>
        <div className="relative aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground text-3xl select-none mb-10">
          📷 Blog Image
        </div>
      </AnimateIn>

      <AnimateIn variant="fade-up" delay={200}>
        <div className="space-y-5">
          <p className="text-muted-foreground text-base leading-relaxed font-medium">
            {blog.excerpt}
          </p>
          {paragraphs.map((para, i) => (
            <p key={i} className="text-foreground text-base leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </AnimateIn>
    </article>
  );
}
