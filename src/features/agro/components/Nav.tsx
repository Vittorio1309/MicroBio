// filepath: src/features/agro/components/Nav.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const sectionIds = ["inicio", "servicos", "sobre", "contato"] as const;

/**
 * Nav Component
 * Navigation bar with scroll detection for agro page
 * Highlights active section based on viewport position
 */
export const Nav: React.FC = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<string>("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setCurrentSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="nav">
      <div className="container">
        <div
          className="text-wrapper"
          onClick={() => navigate("/agro")}
          style={{ cursor: "pointer" }}
        >
          MicroBio
        </div>

        <div className="nav-menu">
          <button
            className={`nav-link ${currentSection === "inicio" ? "is-active" : ""}`}
            onClick={() => scrollToSection("inicio")}
            type="button"
            aria-label="Ir para Início"
          >
            Início
          </button>

          <button
            className={`nav-link ${currentSection === "sobre" ? "is-active" : ""}`}
            onClick={() => scrollToSection("sobre")}
            type="button"
            aria-label="Ir para Sobre"
          >
            Sobre
          </button>

          <button
            className={`nav-link ${currentSection === "servicos" ? "is-active" : ""}`}
            onClick={() => scrollToSection("servicos")}
            type="button"
            aria-label="Ir para Serviços"
          >
            Serviços
          </button>

          <button
            className={`nav-link ${currentSection === "contato" ? "is-active" : ""}`}
            onClick={() => scrollToSection("contato")}
            type="button"
            aria-label="Ir para Contato"
          >
            Contato
          </button>
        </div>

        <div className="nav-actions">
          {(() => {
            const token = localStorage.getItem("microbio_token");
            const role = localStorage.getItem("microbio_role");
            let label = "Login";
            let path = "/login";
            if (token && role === "ROLE_ADMIN") { label = "Voltar à tela admin"; path = "/admin"; }
            else if (token) { label = "Voltar para os exames"; path = "/cliente"; }
            return (
              <button className="button-login" onClick={() => navigate(path)} type="button">
                {label}
              </button>
            );
          })()}
<button
  className="button-orcamento"
  type="button"
  aria-label="Solicitar Orçamento"
  onClick={() => navigate("/orcamento")} // Adicione esta linha
>
  Solicitar Orçamento
</button>
        </div>
      </div>
    </nav>
  );
};
