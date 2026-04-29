// filepath: src/features/agro/components/Nav.tsx
import React from "react";

export const Nav = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="nav">
      <div className="container">
        <div className="text-wrapper">
          <div className="text">MicroBio</div>
        </div>

        <div className="div">
          <button className="link" onClick={() => scrollToSection("inicio")}>
            <div className="text-2">Início</div>
          </button>

          <button className="nav-link" onClick={() => scrollToSection("servicos")}>
            <div className="text-3">Serviços</div>
          </button>

          <button className="nav-link" onClick={() => scrollToSection("sobre")}>
            <div className="text-4">Sobre</div>
          </button>

          <button className="nav-link" onClick={() => scrollToSection("contato")}>
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