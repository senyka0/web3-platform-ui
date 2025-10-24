import React from "react";

export const LoadingSpinner = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`text-3xl font-bold text-gray-900 ${className}`}>
      {message}
    </div>
  );
};

export const ErrorMessage = ({ message, className = "" }) => {
  return (
    <div
      className={`text-xl font-bold text-red-600 bg-red-100 p-4 rounded-xl ${className}`}
    >
      {message}
    </div>
  );
};
