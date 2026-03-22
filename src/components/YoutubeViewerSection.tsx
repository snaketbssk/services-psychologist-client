// Server Component — no "use client"
import { getLocale } from "next-intl/server";
import { getLaunch } from "@/lib/service-psychologist";
import YoutubeViewer, { type VideoPost } from "./YoutubeViewer";

function mapVideos(
  values: NonNullable<Awaited<ReturnType<typeof getLaunch>>["data"]["videos"]>["values"]
): VideoPost[] {
  return values.map((v) => ({
    id: String(v.id),
    date: v.date,
    category: v.category ?? "Shorts",
    title: v.title,
    description: v.description,
    videoId: v.videoId,
  }));
}

export default async function YoutubeViewerSection() {
  const locale = await getLocale();
  try {
    const res = await getLaunch(undefined, locale);
    const videosData = res.data.videos;

    return (
      <YoutubeViewer
        initialPosts={videosData ? mapVideos(videosData.values) : []}
        totalCount={videosData?.totalCount ?? 0}
      />
    );
  } catch (error) {
    console.error("[YoutubeViewerSection] Failed to fetch launch data:", error);
    // Render client-side fallback — YoutubeViewer will fetch page 1 from the browser
    return <YoutubeViewer initialPosts={[]} totalCount={0} />;
  }
}
