import type { CancelToken, AxiosResponse } from "axios";
import { apiClient } from "@/lib/ApiClient";

// ─── Request / filter interfaces ──────────────────────────────────────────────

export interface IConsultationRequest {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

export interface ILaunchFilter {
  [key: string]: unknown;
}

export interface IVideosFilter {
  PageNumber: number;
  PageSize: number;
}

// ─── Response interfaces ───────────────────────────────────────────────────────

export interface IVideoItem {
  id: number | string;
  date: string;
  category?: string;
  title: string;
  description: string;
  videoId: string;
}

export interface IPagedVideos {
  totalCount: number;
  values: IVideoItem[];
}

export interface ILaunchResponse {
  videos?: IPagedVideos;
}

// ─── API functions ─────────────────────────────────────────────────────────────

export const postConsultation = (
  params: IConsultationRequest,
  cancelToken?: CancelToken
): Promise<AxiosResponse> => apiClient.post("consultation", params, cancelToken);

export const getLaunch = (
  params?: ILaunchFilter,
  locale?: string,
  cancelToken?: CancelToken
): Promise<AxiosResponse<ILaunchResponse>> =>
  apiClient.get("launch", params, cancelToken, locale ? { "X-Language": locale } : undefined);

export const getVideos = (
  params: IVideosFilter,
  cancelToken?: CancelToken
): Promise<AxiosResponse<IPagedVideos>> => apiClient.get("videos", params, cancelToken);
