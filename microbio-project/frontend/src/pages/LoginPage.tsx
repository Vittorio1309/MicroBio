// filepath: src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import campoFundo from "../assets/img/login/campo-fundo.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao fazer login");
        setLoading(false);
        return;
      }

      // Armazenar token JWT
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.username);
      localStorage.setItem("role", data.role);

      // Redirecionar baseado no role
      if (data.role === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (data.role === "ROLE_USER") {
        navigate("/user");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="background-image">
        <div className="microbio" style={{ backgroundImage: `url(${campoFundo})` }} />
        <div className="overlay-overlayblur" />
      </div>

      <div className="main-login-container">
        <div className="login-card">

          {/* Marca */}
          <div className="brand-header">
            <div className="text-wrapper">MicroBio</div>
          </div>

          <div className="login-form">
            {error && <div className="error-message">{error}</div>}

            {/* Campo E-mail */}
            <div className="email-field">
              <div className="label-e-mail">E-MAIL</div>
              <div className="input">
                <div className="icon-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  className="container-3"
                  placeholder="email@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="password-field">
              <div className="senha-label">SENHA</div>
              <div className="input">
                <div className="icon-left">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  className="container-3"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <div
                  className="icon-right"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
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
                </div>
              </div>
            </div>

            {/* Botão Entrar */}
            <button className="CTA-button" onClick={handleLogin} disabled={loading || !email || !password}>
              <span className="text">{loading ? "Entrando..." : "Entrar"}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" width="16" height="16">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </button>

            {/* Esqueceu a senha */}
            <div className="link">
              <p className="p">
                Esqueceu sua senha? Entre em contato com a equipe para acessar:
              </p>
              <a
                href="https://wa.me/554599865119"
                target="_blank"
                rel="noopener noreferrer"
                className="button-css-transform"
              >
                <div className="div-wrapper">
                  <span className="text-wrapper-2">Clique aqui</span>
                </div>
              </a>
            </div>

          </div>
        </div>

        {/* Rodapé */}
        <div className="footer-legal">
          <div className="element-microbio">© 2026 MICROBIO</div>
        </div>
      </div>
    </div>
  );
};