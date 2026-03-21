import { setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import BookConsultation from "@/components/BookConsultation";
import SiteFooter from "@/components/SiteFooter";

export default async function BookConsultationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <BookConsultation />
      </main>
      <SiteFooter />
    </div>
  );
}
