import React from "react";
import { useReports } from "../../hooks/useReports";
import { PageLayout } from "../layout/PageLayout";
import { Button } from "../ui/Button";
import { LoadingSpinner, ErrorMessage } from "../ui/LoadingSpinner";
import { ReportCard } from "../reports/ReportCard";

export function ReportsPage() {
  const {
    reports,
    isLoading,
    isClearing,
    isClearingFailed,
    error,
    clearReports,
    clearFailedCSVFiles,
  } = useReports();

  const rightButton = (
    <div className="flex flex-col gap-2 absolute top-6 right-6 z-50">
      <Button
        variant="secondary"
        disabled={isClearing || reports.length === 0}
        onClick={clearReports}
      >
        {isClearing ? "Clearing..." : "Clear All Reports"}
      </Button>
      <Button
        variant="secondary"
        disabled={isClearingFailed}
        onClick={clearFailedCSVFiles}
      >
        {isClearingFailed ? "Clearing..." : "Clear Failed CSV Files"}
      </Button>
    </div>
  );

  return (
    <PageLayout
      title="Reports"
      showBackButton
      backPath="/main"
      rightButton={rightButton}
    >
      {error && <ErrorMessage message={error} className="mb-4" />}

      {isLoading ? (
        <LoadingSpinner message="Loading reports..." />
      ) : reports.length === 0 ? (
        <div className="text-3xl font-bold text-gray-900">
          No reports available
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 max-w-6xl mx-auto">
          {reports.map((report, index) => (
            <ReportCard key={index} report={report} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
