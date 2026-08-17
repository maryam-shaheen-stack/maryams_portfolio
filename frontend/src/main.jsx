import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import App from "./App.jsx";
import { PortfolioDataProvider } from "./context/PortfolioDataContext.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <PortfolioDataProvider>
          <App />
        </PortfolioDataProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
