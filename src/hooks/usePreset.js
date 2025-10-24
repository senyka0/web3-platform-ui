import { useState, useEffect, useRef } from "react";
import { api } from "../services/api";
import {
  generatePlaceholders,
  convertSettingsToProperTypes,
} from "../utils/settingsUtils";

export const usePreset = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [restart, setRestart] = useState(false);
  const [fileType, setFileType] = useState("csv");
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [moduleSettings, setModuleSettings] = useState(null);
  const [editableSettings, setEditableSettings] = useState({});
  const [settingsTypeInfo, setSettingsTypeInfo] = useState({});
  const [enumOptions, setEnumOptions] = useState({});
  const [networks, setNetworks] = useState([]);
  const [startingPreset, setStartingPreset] = useState(false);
  const [presetResponse, setPresetResponse] = useState(null);
  const lastProjectRef = useRef("");
  const networkAutoSelected = useRef(false);

  useEffect(() => {
    fetchTags();
    fetchProjects();
    fetchNetworks();
  }, []);

  useEffect(() => {
    setModules([]);
    setSelectedModule("");
    if (selectedProject) {
      fetchModules(selectedProject);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedModule) {
      fetchModuleSettings(selectedModule);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (moduleSettings) {
      const { placeholders, typeInfo, enumOptions } =
        generatePlaceholders(moduleSettings);
      setEditableSettings(placeholders);
      setSettingsTypeInfo(typeInfo);
      setEnumOptions(enumOptions);
      networkAutoSelected.current = false;
    } else {
      setEditableSettings({});
    }
  }, [moduleSettings]);

  useEffect(() => {
    if (selectedProject !== lastProjectRef.current) {
      networkAutoSelected.current = false;
      lastProjectRef.current = selectedProject;
      setEditableSettings((prev) => {
        if (!prev || !Object.keys(prev).length) return prev;
        return { ...prev, network: [] };
      });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (
      selectedProject &&
      networks.length > 0 &&
      editableSettings &&
      editableSettings.hasOwnProperty("network") &&
      !networkAutoSelected.current
    ) {
      const projectLower = selectedProject.toLowerCase();
      const matchingNetwork = networks.find((network) => {
        const networkLower = network.toLowerCase();
        return (
          networkLower.includes(projectLower) ||
          projectLower.includes(networkLower.split("_")[0])
        );
      });

      if (matchingNetwork) {
        setEditableSettings((prev) => ({
          ...prev,
          network: [matchingNetwork],
        }));
        networkAutoSelected.current = true;
      }
    }
  }, [selectedProject, networks, editableSettings]);

  const fetchTags = async () => {
    try {
      const data = await api.getTags();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchModules = async (projectSlug) => {
    try {
      const data = await api.getModules(projectSlug);
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const fetchModuleSettings = async (moduleSlug) => {
    try {
      const data = await api.getModuleSettings(moduleSlug);
      setModuleSettings(data);
    } catch (error) {
      console.error("Error fetching module settings:", error);
    }
  };

  const fetchNetworks = async () => {
    try {
      const data = await api.getNetworks();
      setNetworks(data);
    } catch (error) {
      console.error("Error fetching networks:", error);
    }
  };

  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSettingChange = (key, value) => {
    setEditableSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const startPreset = async () => {
    if (selectedTags.length === 0) {
      setPresetResponse({
        status: "error",
        message: "Please select at least one tag",
      });
      return;
    }

    if (!selectedProject) {
      setPresetResponse({
        status: "error",
        message: "Please select a project",
      });
      return;
    }

    if (!selectedModule) {
      setPresetResponse({
        status: "error",
        message: "Please select a module",
      });
      return;
    }

    const requiredFields = [];
    const hasBoundariesFields =
      editableSettings.hasOwnProperty("percentage_boundaries") ||
      editableSettings.hasOwnProperty("amount_boundaries");

    Object.entries(settingsTypeInfo).forEach(([key, typeInfo]) => {
      if (typeInfo.includes("Required")) {
        const value = editableSettings[key];
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          if (key === "percentage_boundaries" || key === "amount_boundaries") {
            return;
          }
          requiredFields.push(key);
        }
      }
    });

    if (hasBoundariesFields) {
      const percentageBoundaries = editableSettings.percentage_boundaries;
      const amountBoundaries = editableSettings.amount_boundaries;

      const hasPercentage =
        percentageBoundaries &&
        percentageBoundaries !== "" &&
        percentageBoundaries !== null;
      const hasAmount =
        amountBoundaries &&
        amountBoundaries !== "" &&
        amountBoundaries !== null;

      if (!hasPercentage && !hasAmount) {
        requiredFields.push("percentage_boundaries or amount_boundaries");
      }
    }

    if (requiredFields.length > 0) {
      setPresetResponse({
        status: "error",
        message: `Please fill in required fields: ${requiredFields.join(", ")}`,
      });
      return;
    }

    setStartingPreset(true);
    setPresetResponse(null);

    try {
      const convertedSettings = convertSettingsToProperTypes(
        editableSettings,
        moduleSettings
      );
      const presetData = {
        module: selectedModule,
        project: selectedProject,
        tags: selectedTags,
        settings: convertedSettings,
      };
      const response = await api.startPreset(presetData, restart, fileType);
      setPresetResponse(response);
    } catch (error) {
      console.error("Error starting preset:", error);
      setPresetResponse({
        status: "error",
        message: error.response?.data?.detail || "Failed to start preset",
      });
    } finally {
      setStartingPreset(false);
    }
  };

  return {
    tags,
    selectedTags,
    restart,
    fileType,
    projects,
    selectedProject,
    modules,
    selectedModule,
    editableSettings,
    settingsTypeInfo,
    enumOptions,
    networks,
    startingPreset,
    presetResponse,
    handleTagChange,
    handleSettingChange,
    startPreset,
    setSelectedProject,
    setSelectedModule,
    setRestart,
    setFileType,
  };
};
