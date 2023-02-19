import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "@/app/App";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
