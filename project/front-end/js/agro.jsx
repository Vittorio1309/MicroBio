import React from "react";
import arrowIcon from "../img/icon-2.svg";
import "../css/agro.css";

export const Section = () => {
  return (
    <div className="section">
      <div className="overlay" />
      <div className="container">
        <p className="heading-decis-es">
          Decisões baseadas em
          <br />
          dados, colheitas baseadas
          <br />
          em resultados.
        </p>

        <p className="an-lises">
          Análises laboratoriais de solo, água e insumos com a precisão que o
          <br />
          agronegócio exige.
        </p>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <button className="button">
            <div className="button-shadow" />
            <div className="text-wrapper">Iniciar Análise de Solo</div>
            <div className="SVG">
              <img className="img" alt="Vector" src={arrowIcon} />
            </div>
          </button>

          <button className="div-wrapper">
            <div className="div">Acessar Resultados</div>
          </button>
        </div>
      </div>
    </div>
  );
};
