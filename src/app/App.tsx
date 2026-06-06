import React from "react";
import { AppRoutes } from "../routes";
import "../styles/global.css";

/**
 * App Component
 * Root component that wraps all routes and global styles
 * Centralizes the application structure
 */
export const App: React.FC = () => {
  React.useEffect(() => {
    localStorage.removeItem("microbio_token");
    localStorage.removeItem("microbio_role");
  }, []);

  return <AppRoutes />;
};