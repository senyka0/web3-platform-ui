import axios from "axios";
import { mockApi } from "./mockApi";

const API_BASE_URL = "http://localhost:8000";
const USE_MOCK_API =
  process.env.REACT_APP_USE_MOCK_API === "true" ||
  (process.env.NODE_ENV === "development" &&
    !process.env.REACT_APP_USE_REAL_API);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);

    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Please try again.");
    }

    if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.");
    }

    if (error.response?.status === 404) {
      throw new Error("Resource not found.");
    }

    throw error;
  }
);

export const api = {
  async getTags() {
    if (USE_MOCK_API) {
      return await mockApi.getTags();
    }
    const response = await apiClient.get("/v1/accounts/");
    return response.data;
  },

  async getProjects() {
    if (USE_MOCK_API) {
      return await mockApi.getProjects();
    }
    const response = await apiClient.get("/v1/projects");
    return response.data;
  },

  async getModules(projectSlug) {
    if (USE_MOCK_API) {
      return await mockApi.getModules(projectSlug);
    }
    const response = await apiClient.get(`/v1/module/${projectSlug}`);
    return response.data;
  },

  async getModuleSettings(moduleSlug) {
    if (USE_MOCK_API) {
      return await mockApi.getModuleSettings(moduleSlug);
    }
    const response = await apiClient.get(`/v1/${moduleSlug}/settings/`);
    return response.data;
  },

  async getNetworks() {
    if (USE_MOCK_API) {
      return await mockApi.getNetworks();
    }
    const response = await apiClient.get("/v1/networks/");
    return response.data;
  },

  async startPreset(presetData, restart = false, fileType = "csv") {
    if (USE_MOCK_API) {
      return await mockApi.startPreset(presetData, restart, fileType);
    }
    const response = await apiClient.post(
      `/v1/start_preset/${fileType}/`,
      presetData,
      {
        params: { restart, file_type: fileType },
      }
    );
    return response.data;
  },

  async encodeAccounts() {
    if (USE_MOCK_API) {
      return await mockApi.encodeAccounts();
    }
    const response = await apiClient.get("/v1/encode/accounts");
    return response.data;
  },

  async updateEnv(envData) {
    if (USE_MOCK_API) {
      return await mockApi.updateEnv(envData);
    }
    const response = await apiClient.post("/v1/update-env", envData);
    return response.data;
  },

  async getReports() {
    if (USE_MOCK_API) {
      return await mockApi.getReports();
    }
    const response = await apiClient.get("/v1/reports");
    return response.data;
  },

  async clearReports() {
    if (USE_MOCK_API) {
      return await mockApi.clearReports();
    }
    const response = await apiClient.delete("/v1/reports/delete");
    return response.data;
  },

  async clearFailedCSVFiles() {
    if (USE_MOCK_API) {
      return await mockApi.clearFailedCSVFiles();
    }
    const response = await apiClient.delete("/v1/failed_files/delete");
    return response.data;
  },
};
