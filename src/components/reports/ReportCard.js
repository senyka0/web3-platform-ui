import React from "react";
import { formatDuration, formatDate } from "../../utils/dateUtils";
import { CARD_STYLES } from "../../utils/constants";

export const ReportCard = ({ report }) => {
  return (
    <div className={`${CARD_STYLES.base} p-6 text-left`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Project & Module
          </h3>
          <p className="text-gray-900 font-semibold">
            {report.project_name
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
          <p className="text-gray-900">
            {report.module_name
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-1">
            {report.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-[#792f01] text-[#f08f05] px-2 py-1 rounded text-sm font-bold"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Results</h3>
          <p className="text-green-700 font-bold">Success: {report.success}</p>
          <p className="text-red-700 font-bold">Failed: {report.failed}</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Execution</h3>
          <p className="text-gray-900 text-sm">
            Started:{" "}
            {formatDate(new Date(report.start * 1000), {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })}{" "}
            (UTC)
          </p>
          <p className="text-gray-900 text-sm">
            Ended:{" "}
            {formatDate(new Date(report.end * 1000), {
              day: "numeric",
              month: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            })}{" "}
            (UTC)
          </p>
          <p className="text-gray-900 text-sm">
            Duration: {formatDuration(report.start, report.end)}
          </p>
        </div>
      </div>
    </div>
  );
};
