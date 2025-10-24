export const generatePlaceholders = (settingsMetadata) => {
  const placeholders = {};
  const typeInfo = {};
  const enumOptions = {};

  const standardTypes = ["int", "float", "str", "bool", "list", null];

  Object.entries(settingsMetadata).forEach(([key, config]) => {
    const { default: defaultValue, type } = config;

    const hasNull = type.includes(null);
    const filteredTypes = type.filter((t) => t !== null);

    const isEnum = filteredTypes.some((t) => !standardTypes.includes(t));

    if (isEnum) {
      const enumValues = filteredTypes.filter(
        (t) => !standardTypes.includes(t)
      );
      enumOptions[key] = enumValues;
      const typeString = "Required";
      typeInfo[key] = typeString;

      if (defaultValue !== null) {
        placeholders[key] = defaultValue;
      } else {
        placeholders[key] = enumValues[0] || "";
      }
    } else {
      const typeString = hasNull
        ? `Optional (${filteredTypes.join(",")})`
        : `Required (${filteredTypes.join(",")})`;

      typeInfo[key] = typeString;

      if (defaultValue !== null) {
        placeholders[key] = defaultValue;
      } else {
        placeholders[key] = null;
      }
    }
  });

  return { placeholders, typeInfo, enumOptions };
};

export const convertSettingsToProperTypes = (settings, settingsMetadata) => {
  const convertedSettings = { ...settings };

  const convertStringToNumberArray = (value) => {
    if (typeof value === "string") {
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }
      } else {
        const listValues = value.split(",").map((v) => v.trim());
        return listValues.map((v) => {
          if (!isNaN(v)) {
            return v.includes(".") ? parseFloat(v) : parseInt(v, 10);
          }
          return v;
        });
      }
    } else if (Array.isArray(value)) {
      return value.map((v) => {
        if (typeof v === "string" && !isNaN(v)) {
          return v.includes(".") ? parseFloat(v) : parseInt(v, 10);
        }
        return v;
      });
    }
    return value;
  };

  Object.entries(convertedSettings).forEach(([key, value]) => {
    const config = settingsMetadata[key];
    if (!config) {
      if (key === "delay_between_activities") {
        if (typeof value === "string") {
          convertedSettings[key] = convertStringToNumberArray(value);
        } else if (Array.isArray(value)) {
          convertedSettings[key] = value.map((v) =>
            typeof v === "string" && !isNaN(v)
              ? v.includes(".")
                ? parseFloat(v)
                : parseInt(v, 10)
              : v
          );
        }
      }
      if (key === "network" && Array.isArray(value) && value.length === 1) {
        convertedSettings[key] = value[0];
      }
      return;
    }

    const { type } = config;
    const filteredTypes = type.filter((t) => t !== null);

    if (filteredTypes.includes("list")) {
      try {
        if (typeof value === "string") {
          if (value.startsWith("[") && value.endsWith("]")) {
            convertedSettings[key] = JSON.parse(value);
          } else {
            const listValues = value.split(",").map((v) => v.trim());
            convertedSettings[key] = listValues.map((v) => {
              if (
                filteredTypes.includes("int") &&
                !isNaN(v) &&
                !v.includes(".")
              ) {
                return parseInt(v, 10);
              } else if (filteredTypes.includes("float") && !isNaN(v)) {
                return parseFloat(v);
              }
              return v;
            });
          }
        }
      } catch (error) {
        console.warn(`Failed to parse list for ${key}:`, value);
      }
    } else if (filteredTypes.includes("int")) {
      if (typeof value === "string" && !isNaN(value) && !value.includes(".")) {
        convertedSettings[key] = parseInt(value, 10);
      }
    } else if (filteredTypes.includes("float")) {
      if (typeof value === "string" && !isNaN(value)) {
        convertedSettings[key] = parseFloat(value);
      }
    } else if (filteredTypes.includes("bool")) {
      if (typeof value === "string") {
        convertedSettings[key] = value.toLowerCase() === "true";
      }
    }
  });

  if (convertedSettings.percentage_boundaries) {
    convertedSettings.percentage_boundaries = convertStringToNumberArray(
      convertedSettings.percentage_boundaries
    );
  }

  if (convertedSettings.amount_boundaries) {
    convertedSettings.amount_boundaries = convertStringToNumberArray(
      convertedSettings.amount_boundaries
    );
  }

  if (
    !convertedSettings.delay_between_activities ||
    convertedSettings.delay_between_activities === null
  ) {
    convertedSettings.delay_between_activities = [0, 1];
  } else if (typeof convertedSettings.delay_between_activities === "string") {
    convertedSettings.delay_between_activities = convertStringToNumberArray(
      convertedSettings.delay_between_activities
    );
  } else if (Array.isArray(convertedSettings.delay_between_activities)) {
    convertedSettings.delay_between_activities =
      convertedSettings.delay_between_activities.map((v) =>
        typeof v === "string" && !isNaN(v)
          ? v.includes(".")
            ? parseFloat(v)
            : parseInt(v, 10)
          : v
      );
  }

  if (
    convertedSettings.network &&
    Array.isArray(convertedSettings.network) &&
    convertedSettings.network.length === 1
  ) {
    convertedSettings.network = convertedSettings.network[0];
  }

  Object.entries(settingsMetadata || {}).forEach(([key, config]) => {
    const { type } = config;
    const filteredTypes = type.filter((t) => t !== null);

    if (filteredTypes.includes("bool")) {
      if (
        convertedSettings[key] === null ||
        convertedSettings[key] === undefined ||
        convertedSettings[key] === ""
      ) {
        convertedSettings[key] = false;
      }
    }
  });

  Object.entries(convertedSettings).forEach(([key, value]) => {
    if (
      typeof value === "string" &&
      !isNaN(value) &&
      value !== "" &&
      (key.includes("retry") ||
        key.includes("amount") ||
        key.includes("count") ||
        key === "delay_retry_seconds" ||
        key === "max_retry_after_fail_txn" ||
        key === "queue_threads_amount")
    ) {
      if (value.includes(".")) {
        convertedSettings[key] = parseFloat(value);
      } else {
        convertedSettings[key] = parseInt(value, 10);
      }
    }
  });

  Object.keys(convertedSettings).forEach((key) => {
    if (
      (convertedSettings[key] === null ||
        convertedSettings[key] === undefined ||
        convertedSettings[key] === "") &&
      key !== "delay_between_activities"
    ) {
      delete convertedSettings[key];
    }
  });

  return convertedSettings;
};
