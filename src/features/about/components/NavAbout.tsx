import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * NavAbout Component
 * Navigation bar for About page with route-based active state
 */
export const NavAbout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="nav">
      <div className="container">
        <div className="text-wrapper">MicroBio</div>

        <div className="nav-menu">
          <button
            className={`nav-link ${isActive("/agro") ? "is-active" : ""}`}
            onClick={() => navigate("/agro")}
            type="button"
            aria-label="Ir para Início (/agro)"
          >
            Início
          </button>

          <button
            className={`nav-link ${isActive("/sobre") ? "is-active" : ""}`}
            onClick={() => navigate("/sobre")}
            type="button"
            aria-label="Ir para Sobre"
          >
            Sobre
          </button>

          <button
            className={`nav-link ${isActive("/servicos") ? "is-active" : ""}`}
            onClick={() => navigate("/servicos")}
            type="button"
            aria-label="Ir para Serviços"
          >
            Serviços
          </button>

          <button
            className={`nav-link ${isActive("/contato") ? "is-active" : ""}`}
            onClick={() => navigate("/contato")}
            type="button"
            aria-label="Ir para Contato"
          >
            Contato
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="button-login"
            onClick={() => navigate("/login")}
            type="button"
          >
            Login
          </button>
          <button
            className="button-orcamento"
            type="button"
            aria-label="Solicitar Orçamento"
            onClick={() => navigate("/orcamento")}
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </nav>
  );
};