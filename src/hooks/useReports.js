import { useState, useEffect } from "react";
import { api } from "../services/api";

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [isClearingFailed, setIsClearingFailed] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await api.getReports();
      setReports(data.reverse());
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to fetch reports");
    } finally {
      setIsLoading(false);
    }
  };

  const clearReports = async () => {
    try {
      setIsClearing(true);
      setError(null);
      await api.clearReports();
      setReports([]);
    } catch (error) {
      console.error("Error clearing reports:", error);
      setError("Failed to clear reports");
    } finally {
      setIsClearing(false);
    }
  };

  const clearFailedCSVFiles = async () => {
    try {
      setIsClearingFailed(true);
      setError(null);
      await api.clearFailedCSVFiles();
    } catch (error) {
      console.error("Error clearing failed reports:", error);
      setError("Failed to clear failed reports");
    } finally {
      setIsClearingFailed(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    reports,
    isLoading,
    isClearing,
    isClearingFailed,
    error,
    fetchReports,
    clearReports,
    clearFailedCSVFiles,
  };
};
