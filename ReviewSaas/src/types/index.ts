export interface ImageItem {
  status: string;
  image: string;
}

export interface GeneratePayload {
  business_type: string;
  region: string;
  logo?: File | null;
}

export type AppTab = "generate" | "gallery" | "coming-soon";