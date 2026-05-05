import React, { useEffect } from "react";
import { Nav, Section, BackgroundBorder } from "../features/agro";

export const AgroPage = () => {
  useEffect(() => {
    document.documentElement.classList.add("agro-route");
    document.body.classList.add("agro-route");

    return () => {
      document.documentElement.classList.remove("agro-route");
      document.body.classList.remove("agro-route");
    };
  }, []);

  return (
    <div className="agro-page">
      <Nav />
      <Section />
      <BackgroundBorder />
    </div>
  );
};
