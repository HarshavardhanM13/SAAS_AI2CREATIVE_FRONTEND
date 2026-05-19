import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000/marketing/campaigns";

export interface ImageItem {
  status: string;
  image: string;
}

export interface GeneratePayload {
  business_type: string;
  region: string;
  logo?: File | null;
}

export const generateImages = async (
  data: GeneratePayload
): Promise<ImageItem[]> => {

  const formData = new FormData();

  formData.append(
    "business_type",
    data.business_type
  );

  formData.append(
    "region",
    data.region
  );

  if (data.logo) {
    formData.append(
      "file",
      data.logo
    );
  }

  const response = await axios.post(
    API_URL,
    formData
  );

  return response.data;
};