import React, { useState } from "react";

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form">
      {/* Campo E-mail */}
      <div className="email-field">
        <label htmlFor="email" className="label-e-mail">E-MAIL</label>
        <div className="input-wrapper">
          <div className="icon-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <input
            id="email"
            className="input-field"
            placeholder="email@email.com"
            type="email"
          />
        </div>
      </div>

      {/* Campo Senha */}
      <div className="password-field">
        <label htmlFor="password" className="senha-label">SENHA</label>
        <div className="input-wrapper">
          <div className="icon-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <input
            id="password"
            className="input-field"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            className="icon-right"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Botão Entrar */}
      <button className="cta-button" type="submit">
        <span className="btn-text">Entrar</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" width="16" height="16">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12,5 19,12 12,19" />
        </svg>
      </button>

      {/* Esqueceu a senha */}
      <div className="forgot-password-section">
        <p className="forgot-text">
          Esqueceu sua senha? Entre em contato com a equipe para acessar:
        </p>
        <a
          href="https://wa.me/554599865119"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <span>Clique aqui</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </div>
  );
};
