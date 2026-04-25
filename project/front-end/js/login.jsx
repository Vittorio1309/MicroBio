import { useState } from "react";
import icon from "../img/login/email-icon.svg";
import icon2 from "../img/login/cadeado-icon.svg";
import icon3 from "../img/login/seta-entrar.svg";
import icon4 from "../img/login/olho-senha.svg";
import "../css/login.css";

export const Body = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Por favor, preencha email e senha");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Substitua pela URL do seu backend
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login bem-sucedido:", data);
        // Aqui você pode redirecionar para a próxima página ou salvar o token
        // localStorage.setItem("token", data.token);
        // window.location.href = "/agro.html";
      } else {
        setError("Email ou senha inválidos");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="body">
      <div className="background-image">
        <div className="microbio" />
        <div className="overlay-overlayblur" />
      </div>
      <div className="background" />
      <div className="overlay-blur" />
      <div className="main-login-container">
        <div className="login-card">
          <div className="brand-header">
            <div className="margin">
              <div className="container">
                <div className="heading">
                  <div className="text-wrapper">MicroBio</div>
                </div>
              </div>
            </div>
            <div className="div" />
          </div>
          <div className="login-form">
            <div className="email-field">
              <div className="label-e-mail">E-MAIL</div>
              <div className="container-2">
                  <div className="icon-wrapper">
                    <img className="icon" alt="Icon" src={icon} />
                  </div>
                <div className="input">
                  <input
                    className="container-3"
                    placeholder="email@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              </div>
            </div>
            <div className="password-field">
              <div className="label-wrapper">
                <div className="label">
                  <div className="senha">SENHA</div>
                </div>
              </div>
                  <div className="img-wrapper">
                    <img className="img" alt="Icon" src={icon2} />
                  </div>
              <div className="container-4">
                <div className="container-wrapper">
                  <input
                    className="container-3"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="button">
                    <div
                    className="img-wrapper"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                    >
                      <img className="icon-2" alt="Icon" src={icon4} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {error && <div style={{ color: "#d32f2f", marginBottom: "16px", fontSize: "14px" }}>{error}</div>}
<button
  className="CTA-button"
  onClick={handleLogin}
  disabled={loading}
  style={{
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1,
  }}
>
              <div className="text">{loading ? "Entrando..." : "Entrar"}</div>
              <div className="container-6">
                <img className="icon-3" alt="Icon" src={icon3} />
              </div>
            </button>
          </div>
          <div className="link">
            <p className="p">
              Esqueceu sua senha? Entre em contato com a equipe para acessar:
            </p>
              <div className="button-css-transform">
                <a
                  href="https://altforce.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}>
                  <div className="div-wrapper">
                    <div className="text-wrapper-2">Clique aqui</div>
                  </div>
                </a>
              </div>
          </div>
        </div>
        <div className="footer-legal">
          <div className="element-microbio">© 2026 MICROBIO</div>
        </div>
      </div>
    </div>
  );
};