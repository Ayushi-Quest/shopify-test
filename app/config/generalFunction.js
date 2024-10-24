import axios from "axios";
import { config } from "./config";
import imageCompression from 'browser-image-compression';

export const generalFunction = {
  setUserId: (userId) => {
    // console.log("Set user id:", userId);
    localStorage.setItem("userId", userId);
  },

  getUserId: () => {
    return localStorage.getItem("userId");
  },

  setToken: (token) => {
    // console.log("Set token:", token);
    localStorage.setItem("token", token);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setApiKey: (apiKey) => {
    // console.log("Set api key:", apiKey);
    localStorage.setItem("apiKey", apiKey);
  },

  getApiKey: () => {
    return localStorage.getItem("apiKey");
  },

  setEntityId: (entityId) => {
    // console.log("Set entity id:", entityId);
    localStorage.setItem("entityId", entityId);
  },

  getEntityId: () => {
    return localStorage.getItem("entityId");
  },

  createUrl: (apiString) => {
    const url = `${config.BACKEND_URL}${apiString}`;
    const headers = {
      apikey: config.PARENT_ENTITY_API_KEY,
      userId: config.PARENT_USER_ID,
      token: config.PARENT_TOKEN,
    };
    return {
      url,
      headers,
    };
  },

  count: 0,

  uploadImage: async (file) => {
    if (!file) {
      return null;
    }
    if (file.size > 1000000 && generalFunction.count <= 50) {
      try {
        const compressedImage = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          initialQuality: 1 - generalFunction.count * 0.05,
        });
        generalFunction.count++;
        return await generalFunction.uploadImage(compressedImage);
      } catch (error) {
        return null;
      }
    }

    const { url, headers: baseHeaders } =
      generalFunction.createUrl(`/api/upload-img`);
    const headers = {
      ...baseHeaders,
      "Content-Type": "form-data",
    };

    const formData = new FormData();
    formData.append("uploaded_file", file);

    try {
      const res = await axios.post(url, formData, { headers });
      return res;
    } catch (error) {
      return null;
    }
  }
};
