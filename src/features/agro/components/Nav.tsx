// filepath: src/features/agro/components/Nav.tsx
import React, { useEffect, useState } from "react";

const sectionIds = ["inicio", "servicos", "sobre", "contato"] as const;

export const Nav = () => {
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
    <div className="nav">
      <div className="container">
        <div className="text-wrapper">MicroBio</div>

        <div className="nav-menu">
          <button
            className={`nav-link ${currentSection === "inicio" ? "is-active" : ""}`}
            onClick={() => scrollToSection("inicio")}
          >
            Início
          </button>

          <button
            className={`nav-link ${currentSection === "servicos" ? "is-active" : ""}`}
            onClick={() => scrollToSection("servicos")}
          >
            Serviços
          </button>

          <button
            className={`nav-link ${currentSection === "sobre" ? "is-active" : ""}`}
            onClick={() => scrollToSection("sobre")}
          >
            Sobre
          </button>

          <button
            className={`nav-link ${currentSection === "contato" ? "is-active" : ""}`}
            onClick={() => scrollToSection("contato")}
          >
            Contato
          </button>
        </div>

        <div className="nav-actions">
          <button className="button-login">Login</button>
          <button className="button-orcamento">Solicitar Orçamento</button>
        </div>
      </div>
    </div>
  );
};
