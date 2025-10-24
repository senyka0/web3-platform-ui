import { mockData } from './mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateNetworkDelay = () => delay(Math.random() * 1000 + 500);

const mockApi = {
  async getTags() {
    await simulateNetworkDelay();
    return mockData.tags;
  },

  async getProjects() {
    await simulateNetworkDelay();
    return mockData.projects;
  },

  async getModules(projectSlug) {
    await simulateNetworkDelay();
    const modules = mockData.modules[projectSlug];
    if (!modules) {
      throw new Error(`No modules found for project: ${projectSlug}`);
    }
    return modules;
  },

  async getModuleSettings(moduleSlug) {
    await simulateNetworkDelay();
    const settings = mockData.moduleSettings[moduleSlug];
    if (!settings) {
      throw new Error(`No settings found for module: ${moduleSlug}`);
    }
    return settings;
  },

  async getNetworks() {
    await simulateNetworkDelay();
    return mockData.networks;
  },

  async startPreset(presetData, restart = false, fileType = "csv") {
    await simulateNetworkDelay();
    
    const { module, project, tags, settings } = presetData;
    
    if (!module || !project || !tags || tags.length === 0) {
      throw new Error("Missing required fields: module, project, or tags");
    }

    if (!settings || Object.keys(settings).length === 0) {
      throw new Error("Module settings are required");
    }

    const hasRequiredSettings = Object.entries(settings).some(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== "";
    });

    if (!hasRequiredSettings) {
      throw new Error("At least one setting must be configured");
    }

    const success = Math.random() > 0.1;
    
    if (success) {
      return {
        ...mockData.presetResponses.success,
        task_id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        module,
        project,
        file_type: fileType,
        restart
      };
    } else {
      return mockData.presetResponses.error;
    }
  },

  async encodeAccounts() {
    await simulateNetworkDelay();
    return mockData.encodeResponse;
  },

  async updateEnv(envData) {
    await simulateNetworkDelay();
    
    const { data } = envData;
    if (!data || Object.keys(data).length === 0) {
      throw new Error("No environment variables provided");
    }

    const validKeys = [
      'LICENSE_KEY',
      'CL_API_KEY', 
      'DEEPSEEK_API_KEY',
      'TWOCAPTCHA_API_KEY',
      'SOLVECAPTHCA_API_KEY',
      'ENABLE_LOGGER',
      'ENABLE_COLORED_LOGS',
      'ENABLE_LOGGER_IN_DEBUG',
      'DEVELOP_ENVIRONMENT'
    ];

    const invalidKeys = Object.keys(data).filter(key => !validKeys.includes(key));
    if (invalidKeys.length > 0) {
      throw new Error(`Invalid environment variables: ${invalidKeys.join(', ')}`);
    }

    return mockData.envUpdateResponse;
  },

  async getReports() {
    await simulateNetworkDelay();
    return mockData.reports;
  },

  async clearReports() {
    await simulateNetworkDelay();
    return mockData.clearReportsResponse;
  },

  async clearFailedCSVFiles() {
    await simulateNetworkDelay();
    return mockData.clearFailedCSVResponse;
  }
};

export { mockApi };
