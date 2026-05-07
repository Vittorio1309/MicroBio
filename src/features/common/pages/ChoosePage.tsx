import React, { useState } from "react";
<<<<<<<< HEAD:microbio-project/frontend/src/pages/ChoosePage.tsx
import agroImage from "../assets/img/background-image-with-overlay.png";
import saudeImage from "../assets/img/microbio-hero-1.png";
import arrowIcon from "../assets/img/icon-2.svg";
import icon from "../assets/img/Icon.svg";
========
import agroImage from "../../../assets/img/background-image-with-overlay.png";
import saudeImage from "../../../assets/img/microbio-hero-1.png";
import arrowIcon from "../../../assets/img/icon-2.svg";
import icon from "../../../assets/img/icon.svg";
>>>>>>>> 3408e94e3ff2877b5b6e459d8aa2364ad23a4745:src/features/common/pages/ChoosePage.tsx
import "../styles/choose.css";

export const ChoosePage: React.FC = () => {
  const [hovered, setHovered] = useState<"agro" | "saude" | null>(null);

  const agroUrl = "/agro";
  const saudeUrl = "https://microbio.uniexames.com.br/cms/inicio";

  return (
    <div className={`choose-container ${hovered ? `hovering-${hovered}` : ""}`}>
      {/* Logo superior central */}
      <div className="top-logo">MicroBio</div>

      {/* Seletor central com pulso */}
      <div className={`center-selector ${hovered ? "selector-hidden" : ""}`}>
        <div className="selector-icon">
          <img src={arrowIcon} alt="select" />
        </div>
        <div className="selector-label">SELECIONE</div>
      </div>

      {/* LADO ESQUERDO: AGRONEGÓCIO */}
      <div
        className="section agro"
        onMouseEnter={() => setHovered("agro")}
        onMouseLeave={() => setHovered(null)}
      >
        <img className="section-bg" src={agroImage} alt="Agro" />
        <div className="section-overlay agro-overlay" />
        <div className="section-content">
          <h1 className="section-title">Agronegócio</h1>
          <p className="section-description">
            Soluções biológicas inovadoras para aumentar a produtividade e saúde do seu solo de forma sustentável.
          </p>
          <a href={agroUrl} className="btn-access">
            Acessar Plataforma Agro <img src={icon} className="btn-icon" alt="" />
          </a>
        </div>
      </div>

      {/* LADO DIREITO: SAÚDE */}
      <div
        className="section saude"
        onMouseEnter={() => setHovered("saude")}
        onMouseLeave={() => setHovered(null)}
      >
        <img className="section-bg" src={saudeImage} alt="Saúde" />
        <div className="section-overlay saude-overlay" />
        <div className="section-content">
          <h1 className="section-title">Saúde</h1>
          <p className="section-description">
            Análises clínicas confiáveis com resultados precisos para sua saúde e bem-estar.
          </p>
          <a href={saudeUrl} className="btn-access">
            Acessar Plataforma Saúde <img src={icon} className="btn-icon" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};
