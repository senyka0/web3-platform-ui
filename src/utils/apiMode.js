export const getApiMode = () => {
  const useMockApi = process.env.REACT_APP_USE_MOCK_API === "true";
  const useRealApi = process.env.REACT_APP_USE_REAL_API === "true";
  const isDevelopment = process.env.NODE_ENV === "development";

  if (useMockApi) {
    return "mock";
  }

  if (useRealApi) {
    return "real";
  }

  if (isDevelopment) {
    return "mock";
  }

  return "real";
};

export const isMockMode = () => getApiMode() === "mock";

export const isRealMode = () => getApiMode() === "real";

export const getApiModeInfo = () => {
  const mode = getApiMode();
  const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

  return {
    mode,
    baseUrl,
    isMock: mode === "mock",
    isReal: mode === "real",
    description:
      mode === "mock"
        ? "Using mock API with simulated data"
        : `Using real API at ${baseUrl}`,
  };
};
