import React from "react";
import arrowIcon from "../img/icon-2.svg";
import "../css/agro.css";


export const Nav = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="nav">
      <div className="container">
        <div className="text-wrapper">
          <div className="text">MicroBio</div>
        </div>

        <div className="div">
          <button className="link" onClick={() => scrollToSection('inicio')}>
            <div className="text-2">Início</div>
          </button>

          <button className="nav-link" onClick={() => scrollToSection('servicos')}>
            <div className="text-3">Serviços</div>
          </button>

          <button className="nav-link" onClick={() => scrollToSection('sobre')}>
            <div className="text-4">Sobre</div>
          </button>

          <button className="nav-link" onClick={() => scrollToSection('contato')}>
            <div className="text-5">Contato</div>
          </button>
        </div>

        <div className="nav-actions">
          <button className="button-login">
            <div className="text">Login</div>
          </button>

          <button className="button-orcamento">
            <div className="div">Solicitar Orçamento</div>
          </button>
        </div>
      </div>
    </div>
  );
};

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

import vector from "../img/svg-1.svg";
import vector2 from "../img/svg-2.svg";
import vector3 from "..img/svg-3.svg";


export const BackgroundBorder = () => {
  return (
    <div className="background-border">
      <div className="overlay-shadow" />

      <div className="background">
        <div className="SVG">
          <img className="vector" alt="Vector" src={vector} />

          <img className="img" alt="Vector" src={image} />

          <img className="vector-2" alt="Vector" src={vector2} />
        </div>
      </div>

      <div className="heading-an-lises">Análises Precisas</div>

      <p className="laudos-t-cnicos-com">
        Laudos técnicos com
        <br />
        metodologias reconhecidas e<br />
        certificadas.
      </p>

      <div className="SVG-wrapper">
        <div className="SVG">
          <img className="vector-3" alt="Vector" src={vector3} />

          <img className="vector-4" alt="Vector" src={vector4} />
        </div>
      </div>

      <div className="heading">Sustentabilidade</div>

      <p className="dados-que-otimizam-o">
        Dados que otimizam o uso de
        <br />
        insumos e preservam o solo.
      </p>

      <div className="div-wrapper">
        <div className="SVG">
          <img className="vector-5" alt="Vector" src={vector5} />

          <img className="vector-6" alt="Vector" src={vector6} />
        </div>
      </div>

      <div className="heading-confian-a">Confiança</div>

      <p className="mais-de">
        Mais de 1.450 propriedades
        <br />
        monitoradas no último ano.
      </p>
    </div>
  );
};