export const formatTimestamp = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString("en-US", {
    timeZone: "UTC",
  });
};

export const formatDuration = (start, end) => {
  const duration = end - start;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}m ${seconds}s`;
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", {
    ...defaultOptions,
    ...options,
  });
};
