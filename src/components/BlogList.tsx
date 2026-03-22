import AnimateIn from "@/components/AnimateIn";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const ARTICLES = [
  {
    id: "1",
    dateKey: "A1_DATE",
    categoryKey: "A1_CATEGORY",
    titleKey: "A1_TITLE",
    excerptKey: "A1_EXCERPT",
  },
  {
    id: "2",
    dateKey: "A2_DATE",
    categoryKey: "A2_CATEGORY",
    titleKey: "A2_TITLE",
    excerptKey: "A2_EXCERPT",
  },
  {
    id: "3",
    dateKey: "A3_DATE",
    categoryKey: "A3_CATEGORY",
    titleKey: "A3_TITLE",
    excerptKey: "A3_EXCERPT",
  },
  {
    id: "4",
    dateKey: "A1_DATE",
    categoryKey: "A1_CATEGORY",
    titleKey: "A1_TITLE",
    excerptKey: "A1_EXCERPT",
  },
  {
    id: "5",
    dateKey: "A2_DATE",
    categoryKey: "A2_CATEGORY",
    titleKey: "A2_TITLE",
    excerptKey: "A2_EXCERPT",
  },
  {
    id: "6",
    dateKey: "A3_DATE",
    categoryKey: "A3_CATEGORY",
    titleKey: "A3_TITLE",
    excerptKey: "A3_EXCERPT",
  },
  {
    id: "7",
    dateKey: "A1_DATE",
    categoryKey: "A1_CATEGORY",
    titleKey: "A1_TITLE",
    excerptKey: "A1_EXCERPT",
  },
  {
    id: "8",
    dateKey: "A2_DATE",
    categoryKey: "A2_CATEGORY",
    titleKey: "A2_TITLE",
    excerptKey: "A2_EXCERPT",
  },
  {
    id: "9",
    dateKey: "A3_DATE",
    categoryKey: "A3_CATEGORY",
    titleKey: "A3_TITLE",
    excerptKey: "A3_EXCERPT",
  },
] as const;

export default async function BlogList() {
  const t = await getTranslations("BLOG_SECTION");
  const tList = await getTranslations("BLOG_LIST");

  return (
    <section className="max-w-6xl mx-auto">
      <AnimateIn variant="fade-up">
        <div className="mb-10">
          <p className="text-subject text-sm font-medium tracking-widest uppercase mb-2">
            {t("EYEBROW")}
          </p>
          <h1 className="font-heading text-4xl font-bold text-foreground">
            {t("HEADING")}
          </h1>
          <p className="text-muted-foreground mt-3 text-base max-w-2xl">
            {tList("DESCRIPTION")}
          </p>
        </div>
      </AnimateIn>

      <div className="grid lg:grid-cols-3 gap-6">
        {ARTICLES.map((article, i) => (
          <AnimateIn key={article.id} variant="fade-up" delay={i * 100}>
            {/* article wraps the card and is the group target for hover effects */}
            <article className="h-full group">
              <Card className="relative overflow-hidden p-0 h-full transition-all duration-200 group-hover:shadow-lg group-hover:ring-subject/40">
                {/* stretched link — makes the whole card clickable */}
                <Link
                  href={`/blogs/${article.id}`}
                  className="absolute inset-0 z-10"
                  aria-label={t(article.titleKey)}
                />

                {/* image area */}
                <div className="relative aspect-video bg-muted flex items-center justify-center text-muted-foreground text-3xl select-none overflow-hidden">
                  📷 Blog Image
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg px-3 py-1 text-sm font-bold leading-tight">
                    {t(article.dateKey)}
                  </div>
                </div>

                {/* content — flex column so footer is always at the bottom */}
                <CardContent className="pt-4 pb-4 flex flex-col flex-1">
                  <Badge variant="secondary" className="w-fit">
                    {t(article.categoryKey)}
                  </Badge>

                  <h2 className="font-heading font-semibold text-lg text-foreground mt-2 leading-snug">
                    {t(article.titleKey)}
                  </h2>

                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed flex-1">
                    {t(article.excerptKey)}
                  </p>

                  {/* CTA row — always pinned to bottom by flex-1 above */}
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
    </section>
  );
}
