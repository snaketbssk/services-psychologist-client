// Server Component — no "use client"
import YoutubeViewer, { type VideoPost } from "./YoutubeViewer";

interface ApiVideo {
  id: number | string;
  day: string;
  month: string;
  category?: string;
  title: string;
  videoId: string;
}

interface ApiResponse {
  videos?: {
    totalCount: number;
    values: ApiVideo[];
  };
}

async function fetchLaunchData(): Promise<ApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not set");
  const res = await fetch(`${baseUrl.replace(/\/$/, "")}/launch`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default async function YoutubeViewerSection() {
  try {
    const data = await fetchLaunchData();
    const videos: VideoPost[] = (data.videos?.values ?? []).map((v) => ({
      id: String(v.id),
      day: v.day,
      month: v.month,
      category: v.category ?? "Shorts",
      title: v.title,
      videoId: v.videoId,
    }));
    return (
      <YoutubeViewer
        initialPosts={videos}
        totalCount={data.videos?.totalCount ?? 0}
      />
    );
  } catch (error) {
    console.error("[YoutubeViewerSection] Failed to fetch /launch:", error);
    return <YoutubeViewer initialPosts={[]} totalCount={0} />;
  }
}
