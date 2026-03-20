// Server Component — no "use client"
import { getLaunch, type ILaunchResponse } from "@/lib/service-psychologist";
import YoutubeViewer, { type VideoPost } from "./YoutubeViewer";

function mapVideos(data: ILaunchResponse): VideoPost[] {
  return (data.videos?.values ?? []).map((v) => ({
    id: String(v.id),
    day: v.day,
    month: v.month,
    category: v.category ?? "Shorts",
    title: v.title,
    videoId: v.videoId,
  }));
}

export default async function YoutubeViewerSection() {
  try {
    const res = await getLaunch();
    const videos = mapVideos(res.data);
    return (
      <YoutubeViewer
        initialPosts={videos}
        totalCount={res.data.videos?.totalCount ?? 0}
      />
    );
  } catch (error) {
    console.error("[YoutubeViewerSection] Failed to fetch launch:", error);
    return <YoutubeViewer initialPosts={[]} totalCount={0} />;
  }
}
