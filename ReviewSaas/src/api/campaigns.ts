
import axios from "axios";
import {  type GeneratePayload, type ImageItem } from "../types";

const API_URL = "https://saas-ai2creative-backend.onrender.com/";

export const generateImages = async (
  data: GeneratePayload
): Promise<ImageItem[]> => {
  const formData = new FormData();

  formData.append("business_type", data.business_type);
  formData.append("region", data.region);

  if (data.logo) {
    formData.append("file", data.logo);
  }

  const response = await axios.post(API_URL, formData);
  return response.data;
};