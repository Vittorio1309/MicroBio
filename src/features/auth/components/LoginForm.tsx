import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("microbio_token", data.token);
        localStorage.setItem("microbio_role", data.role ?? "");
        navigate(data.role === "ROLE_ADMIN" ? "/admin" : "/agro");
      } else {
        setError(data.message || "Usuário ou senha incorretos");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Campo Usuário */}
      <div className="email-field">
        <label htmlFor="username" className="label-e-mail">USUÁRIO</label>
        <div className="input-wrapper">
          <div className="icon-left">
            <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <input
            id="username"
            className="input-field"
            placeholder="Digite seu usuário"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
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

      {error && (
        <p style={{ color: "#c0392b", fontSize: "0.8rem", margin: "0 0 8px", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* Botão Entrar */}
      <button className="cta-button" type="submit" disabled={loading}>
        <span className="btn-text">{loading ? "Entrando..." : "Entrar"}</span>
        {!loading && (
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" width="16" height="16">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        )}
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
    </form>
  );
};
