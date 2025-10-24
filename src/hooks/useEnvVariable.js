import { useState } from "react";
import { api } from "../services/api";

export const useEnvVariable = () => {
  const [showEnvForm, setShowEnvForm] = useState(false);
  const [envVariables, setEnvVariables] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateDone, setUpdateDone] = useState(false);

  const envVariableOptions = {
    LICENSE_KEY: {
      label: "License Key",
      type: "text",
      placeholder: "Enter your license key",
    },
    CL_API_KEY: {
      label: "CL API Key",
      type: "text",
      placeholder: "Enter your CL API key",
    },
    DEEPSEEK_API_KEY: {
      label: "DeepSeek API Key",
      type: "text",
      placeholder: "Enter your DeepSeek API key",
    },
    TWOCAPTCHA_API_KEY: {
      label: "2Captcha API Key",
      type: "text",
      placeholder: "Enter your 2Captcha API key",
    },
    SOLVECAPTHCA_API_KEY: {
      label: "SolveCapthca API Key",
      type: "text",
      placeholder: "Enter your SolveCapthca API key",
    },
    ENABLE_LOGGER: {
      label: "Enable Logger",
      options: ["true", "false"],
      placeholder: "Enable logger",
    },
    ENABLE_COLORED_LOGS: {
      label: "Enable Colored Logs",
      options: ["true", "false"],
      placeholder: "Enable colored logs",
    },
    ENABLE_LOGGER_IN_DEBUG: {
      label: "Enable Logger in Debug",
      options: ["true", "false"],
      placeholder: "Enable logger in debug",
    },
    DEVELOP_ENVIRONMENT: {
      label: "Develop Environment",
      options: ["true", "false"],
      placeholder: "Enable develop environment",
    },
  };

  const toggleEnvForm = () => {
    setShowEnvForm(!showEnvForm);
    if (!showEnvForm) {
      setEnvVariables({});
      setUpdateDone(false);
    }
  };

  const handleEnvChange = (key, value) => {
    setEnvVariables((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (updateDone) {
      setUpdateDone(false);
    }
  };

  const handleUpdateEnv = async () => {
    const nonEmptyVariables = Object.entries(envVariables)
      .filter(([_, value]) => value && value.trim())
      .reduce((acc, [key, value]) => {
        acc[key] = value.trim();
        return acc;
      }, {});

    if (Object.keys(nonEmptyVariables).length === 0) {
      return;
    }

    setIsUpdating(true);
    try {
      await api.updateEnv({
        data: nonEmptyVariables,
      });
      setUpdateDone(true);
    } catch (error) {
      console.error("Error updating environment variable:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const hasNonEmptyValues = Object.values(envVariables).some(
    (value) => value && value.trim()
  );

  const isUpdateButtonDisabled = isUpdating || !hasNonEmptyValues || updateDone;

  return {
    showEnvForm,
    envVariables,
    envVariableOptions,
    isUpdating,
    updateDone,
    hasNonEmptyValues,
    isUpdateButtonDisabled,
    handleEnvChange,
    toggleEnvForm,
    handleUpdateEnv,
  };
};
