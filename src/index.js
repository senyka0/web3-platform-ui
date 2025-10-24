import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { getApiModeInfo } from "./utils/apiMode";

const apiInfo = getApiModeInfo();
console.log(`🚀 API Mode: ${apiInfo.description}`);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
