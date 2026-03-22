import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import AnimateIn from "@/components/AnimateIn";

const VALID_IDS = ["1", "2", "3"] as const;
type ArticleId = (typeof VALID_IDS)[number];

const ARTICLE_MAP: Record<
  ArticleId,
  { dateKey: string; categoryKey: string; titleKey: string; excerptKey: string; contentKey: string }
> = {
  "1": { dateKey: "A1_DATE", categoryKey: "A1_CATEGORY", titleKey: "A1_TITLE", excerptKey: "A1_EXCERPT", contentKey: "A1_CONTENT" },
  "2": { dateKey: "A2_DATE", categoryKey: "A2_CATEGORY", titleKey: "A2_TITLE", excerptKey: "A2_EXCERPT", contentKey: "A2_CONTENT" },
  "3": { dateKey: "A3_DATE", categoryKey: "A3_CATEGORY", titleKey: "A3_TITLE", excerptKey: "A3_EXCERPT", contentKey: "A3_CONTENT" },
};

export default async function BlogDetail({ id }: { id: string }) {
  if (!VALID_IDS.includes(id as ArticleId)) notFound();

  const article = ARTICLE_MAP[id as ArticleId];
  const t = await getTranslations("BLOG_SECTION");
  const tDetail = await getTranslations("BLOG_DETAIL");

  const content = t(article.contentKey as Parameters<typeof t>[0]);
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto">
      <AnimateIn variant="fade-up">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline mb-8"
        >
          ← {tDetail("BACK_TO_BLOG")}
        </Link>

        <div className="mt-6">
          <Badge variant="secondary" className="mb-4">
            {t(article.categoryKey)}
          </Badge>

          <h1 className="font-heading text-4xl font-bold text-foreground leading-tight mb-3">
            {t(article.titleKey)}
          </h1>

          <p className="text-muted-foreground text-sm mb-8">
            {t(article.dateKey)} · {tDetail("READ_TIME")}
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
            {t(article.excerptKey)}
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
