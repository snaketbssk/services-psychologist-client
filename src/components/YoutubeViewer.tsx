"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { apiClient } from "@/lib/ApiClient";
import { cn } from "@/lib/utils";

import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VideoPost {
  id: string;
  day: string;
  month: string;
  category: string;
  title: string;
  videoId: string;
}

export interface PagedVideosResponse {
  totalCount: number;
  values: VideoPost[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const thumb = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/oar2.jpg`;

const embedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Therapy: "#F5C5A3",
  Wellness: "#A8DFBA",
};

const PAGE_SIZE = 10;
const CARD_W = 300;

// ─── Query ────────────────────────────────────────────────────────────────────

async function fetchVideosPage(
  pageNumber: number
): Promise<PagedVideosResponse> {
  const res = await apiClient.get(
    `/videos?PageNumber=${pageNumber}&PageSize=${PAGE_SIZE}`
  );
  return res.data;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded bg-muted-foreground/10", className)}
    />
  );
}

function VideoCardSkeleton() {
  return (
    <div className="flex flex-col w-full rounded-2xl overflow-hidden bg-muted">
      <div className="w-full relative" style={{ aspectRatio: "9/16" }}>
        <SkeletonBlock className="absolute inset-0 rounded-none rounded-t-2xl" />
      </div>
      <div className="p-[14px_16px_18px] space-y-2">
        <SkeletonBlock className="w-16 h-5 rounded-md" />
        <SkeletonBlock className="h-[18px]" />
        <SkeletonBlock className="h-[18px]" />
        <SkeletonBlock className="h-[18px] w-3/5" />
      </div>
    </div>
  );
}

// ─── PlayIcon ─────────────────────────────────────────────────────────────────

function PlayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.92)" />
      <path d="M20 16l14 8-14 8V16z" fill="#2C1A0E" />
    </svg>
  );
}

// ─── VideoCard ────────────────────────────────────────────────────────────────

interface VideoCardProps {
  post: VideoPost;
  playing: boolean;
  onPlay: () => void;
  shortsLabel: string;
}

function VideoCard({ post, playing, onPlay, shortsLabel }: VideoCardProps) {
  const catBg = CATEGORY_COLORS[post.category] ?? "#F5C5A3";

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-muted h-full">
      {/* Thumbnail / iframe */}
      <div
        className="relative w-full overflow-hidden shrink-0 rounded-t-2xl bg-black cursor-pointer"
        style={{ aspectRatio: "9/16" }}
        onClick={onPlay}
      >
        {playing ? (
          <iframe
            src={embedUrl(post.videoId)}
            title={post.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0 block"
          />
        ) : (
          <>
            {/* Thumbnail — group-hover handled by parent SwiperSlide wrapper */}
            <img
              src={thumb(post.videoId)}
              alt={post.title}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]"
            />

            {/* Overlay + play button */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/[0.08] hover:bg-black/[0.18] transition-colors duration-200">
              <div className="transition-transform duration-200 hover:scale-110">
                <PlayIcon />
              </div>
            </div>

            {/* Date badge */}
            <div className="absolute top-3.5 left-3.5 z-10 bg-foreground text-background rounded-lg px-2.5 py-1.5 text-center leading-tight min-w-[44px] select-none">
              <p className="text-base font-bold leading-none">{post.day}</p>
              <p className="text-[10px] font-semibold tracking-[0.06em] uppercase mt-0.5">
                {post.month}
              </p>
            </div>

            {/* Shorts badge */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-md px-2 py-[3px] bg-[rgba(255,0,0,0.88)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
                <path d="M1 2.5C1 1.67 1.895 1.17 2.6 1.6l7.6 4.8c.667.44.667 1.36 0 1.8L2.6 13c-.705.43-1.6-.07-1.6-.9V2.5z" />
              </svg>
              <span className="text-[10px] font-bold text-white leading-none">
                {shortsLabel}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Card body */}
      <div className="p-[14px_16px_18px] grow">
        <span
          className="inline-block px-2.5 py-[3px] rounded-md text-[10px] font-bold tracking-[0.1em] uppercase text-foreground mb-3"
          style={{ backgroundColor: catBg }}
        >
          {post.category}
        </span>
        <p className="font-heading text-[15px] font-medium leading-[1.45] text-foreground line-clamp-3">
          {post.title}
        </p>
      </div>
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface YoutubeViewerProps {
  initialPosts?: VideoPost[];
  totalCount?: number;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function YoutubeViewer({
  initialPosts = [],
  totalCount = 0,
  eyebrow,
  heading,
  subheading,
}: YoutubeViewerProps) {
  const t = useTranslations("YOUTUBE_VIEWER");
  const resolvedEyebrow   = eyebrow   ?? t("EYEBROW");
  const resolvedHeading   = heading   ?? t("HEADING");
  const resolvedSubheading = subheading ?? t("SUBHEADING");
  const shortsLabel = t("SHORTS");
  // Defer Swiper render until after hydration to avoid layout flash
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Match md breakpoint (< 900px = mobile)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [activeId, setActiveId] = useState<string | null>(null);

  const hasSSR = initialPosts.length > 0;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery<PagedVideosResponse>({
      queryKey: ["videos"],
      queryFn: ({ pageParam }) => fetchVideosPage(pageParam as number),
      initialPageParam: hasSSR ? 2 : 1,
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.reduce((sum, p) => sum + p.values.length, 0);
        const total = lastPage.totalCount ?? totalCount;
        return loaded < total ? allPages.length + 1 : undefined;
      },
      ...(hasSSR && {
        initialData: {
          pages: [{ totalCount, values: initialPosts }],
          pageParams: [1],
        },
      }),
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    });

  const allVideos = data?.pages.flatMap((p) => p.values) ?? [];

  // Keep latest fetch state in a ref so Swiper event handlers never go stale
  const fetchRef = useRef({ fetchNextPage, hasNextPage, isFetchingNextPage });
  useEffect(() => {
    fetchRef.current = { fetchNextPage, hasNextPage, isFetchingNextPage };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // onProgress fires continuously during free-scroll (onSlideChange does not in FreeMode)
  const handleProgress = useCallback((_swiper: SwiperType, progress: number) => {
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = fetchRef.current;
    if (progress >= 0.75 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, []);

  // Mobile uses snap pagination — keep slide-change trigger for it
  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = fetchRef.current;
    const remaining = swiper.slides.length - swiper.activeIndex - 1;
    if (remaining <= 3 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, []);

  if (!isLoading && !allVideos.length) return null;

  return (
    <section className="overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 px-6">
        <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-3">
          {resolvedEyebrow}
        </p>
        <h2 className="font-heading font-normal text-[28px] md:text-[38px] leading-[1.2] text-foreground mb-3">
          {resolvedHeading}
        </h2>
        <p className="text-[14px] md:text-[15px] text-muted-foreground leading-[1.7] max-w-[460px] mx-auto">
          {resolvedSubheading}
        </p>
      </div>

      {isLoading ? (
        // No SSR data — client is fetching page 1, show skeleton row
        <div className="flex gap-5 overflow-hidden px-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="shrink-0 rounded-2xl overflow-hidden bg-muted"
              style={{ width: CARD_W }}
            >
              <div className="w-full relative" style={{ aspectRatio: "9/16" }}>
                <SkeletonBlock className="absolute inset-0 rounded-none rounded-t-2xl" />
              </div>
              <div className="p-[14px_16px_18px] space-y-2">
                <SkeletonBlock className="w-16 h-5 rounded-md" />
                <SkeletonBlock className="h-[18px]" />
                <SkeletonBlock className="h-[18px]" />
                <SkeletonBlock className="h-[18px] w-3/5" />
              </div>
            </div>
          ))}
        </div>
      ) : !mounted ? (
        // SSR data available — render static card row before Swiper hydrates to avoid flash
        <div className="flex gap-5 overflow-hidden px-6">
          {allVideos.slice(0, 4).map((post) => (
            <div
              key={post.id}
              className="shrink-0 rounded-2xl overflow-hidden bg-muted"
              style={{ width: CARD_W }}
            >
              <VideoCard post={post} playing={false} onPlay={() => {}} shortsLabel={shortsLabel} />
            </div>
          ))}
        </div>
      ) : (
        <div className="yt-swiper">
          <Swiper
            modules={isMobile ? [Pagination] : [FreeMode]}
            onProgress={handleProgress}
            onSlideChange={handleSlideChange}
            slidesPerView="auto"
            touchRatio={1}
            resistance
            a11y={{ enabled: true }}
            {...(isMobile
              ? {
                  centeredSlides: true,
                  spaceBetween: 16,
                  grabCursor: false,
                  resistanceRatio: 0.6,
                  freeMode: false,
                  pagination: { clickable: true },
                }
              : {
                  centeredSlides: false,
                  spaceBetween: 20,
                  grabCursor: true,
                  resistanceRatio: 0.85,
                  freeMode: {
                    enabled: true,
                    momentum: true,
                    momentumRatio: 0.6,
                    momentumVelocityRatio: 0.8,
                  },
                  pagination: false,
                })}
          >
            {allVideos.map((post) => (
              <SwiperSlide
                key={post.id}
                style={{
                  width: isMobile ? "80vw" : `${CARD_W}px`,
                  maxWidth: isMobile ? "320px" : `${CARD_W}px`,
                  height: "auto",
                }}
              >
                {/* group enables group-hover:scale on thumbnail inside VideoCard */}
                <div className="group h-full">
                  <VideoCard
                    post={post}
                    playing={activeId === post.id}
                    onPlay={() => setActiveId(post.id)}
                    shortsLabel={shortsLabel}
                  />
                </div>
              </SwiperSlide>
            ))}

            {isFetchingNextPage &&
              [0, 1, 2].map((i) => (
                <SwiperSlide
                  key={`sk-${i}`}
                  style={{ width: `${CARD_W}px`, height: "auto" }}
                >
                  <VideoCardSkeleton />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
