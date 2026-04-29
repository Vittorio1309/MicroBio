// filepath: src/features/agro/components/Section.tsx
import React from "react";
import arrowIcon from "../../../assets/img/icon-2.svg";

export const Section = () => {
  return (
    <div className="section">
      <div className="content">
        <div className="heading">
          <div className="title">Soluções Biológicas para o Campo</div>
        </div>
        <div className="description">
          <p>
            Desenvolvemos produtos biológicos inovadores para
            otimizar a produtividade agrícola de forma sustentável.
          </p>
        </div>
        <button className="cta-button">
          <div className="text">Saiba mais</div>
          <img className="icon" alt="Arrow" src={arrowIcon} />
        </button>
      </div>
    </div>
  );
};