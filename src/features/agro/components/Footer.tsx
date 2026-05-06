import React from "react";

/**
 * Footer Component
 * Application footer with navigation and social links
 */
export const Footer: React.FC = () => {
  return (
    <footer className="agro-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">MicroBio</span>
        </div>

<nav className="footer-nav">
  {/* Troque #inicio por / para voltar à Home, ou /#inicio se quiser a seção específica */}
  <a href="/agro" className="footer-nav-link">
    Início
  </a>
  <a href="/servicos" className="footer-nav-link">
    Serviços
  </a>
  <a href="/sobre" className="footer-nav-link">
    Sobre
  </a>
          <a
            href="https://microbio.uniexames.com.br/cms/inicio"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-nav-link"
          >
            Laboratório
          </a>
        </nav>

        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/company/microbiolaboratorio/?originalSubdomain=br"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon linkedin"
            aria-label="LinkedIn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.424-.103.249-.129.597-.129.946v5.435h-3.554s.05-8.807 0-9.726h3.554v1.375c.427-.659 1.191-1.594 2.898-1.594 2.117 0 3.708 1.384 3.708 4.36v5.585zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.956.77-1.715 1.958-1.715 1.187 0 1.927.759 1.958 1.715 0 .953-.771 1.715-1.958 1.715zm1.959 11.612h-3.917V9.231h3.917v11.236zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/microbiolaboratorio/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon instagram"
            aria-label="Instagram"
          >
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
</svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
