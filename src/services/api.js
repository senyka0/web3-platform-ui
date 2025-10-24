import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

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
    const response = await apiClient.get("/v1/accounts/");
    return response.data;
  },

  async getProjects() {
    const response = await apiClient.get("/v1/projects");
    return response.data;
  },

  async getModules(projectSlug) {
    const response = await apiClient.get(`/v1/module/${projectSlug}`);
    return response.data;
  },

  async getModuleSettings(moduleSlug) {
    const response = await apiClient.get(`/v1/${moduleSlug}/settings/`);
    return response.data;
  },

  async getNetworks() {
    const response = await apiClient.get("/v1/networks/");
    return response.data;
  },

  async startPreset(presetData, restart = false, fileType = "csv") {
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
    const response = await apiClient.get("/v1/encode/accounts");
    return response.data;
  },

  async updateEnv(envData) {
    const response = await apiClient.post("/v1/update-env", envData);
    return response.data;
  },

  async getReports() {
    const response = await apiClient.get("/v1/reports");
    return response.data;
  },

  async clearReports() {
    const response = await apiClient.delete("/v1/reports/delete");
    return response.data;
  },

  async clearFailedCSVFiles() {
    const response = await apiClient.delete("/v1/failed_files/delete");
    return response.data;
  },
};
