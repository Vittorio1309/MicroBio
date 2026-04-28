import icon from "../img/login/email-icon.svg";
import icon2 from "../img/login/cadeado-icon.svg";
import icon3 from "..img/login/seta-entrar.svg"
import icon4 from "..img/login/olho-senha.svg"
import image from "../img/login/campo-fundo.png";
import "../css/login.css";

export const Body = () => {
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
                <div className="input">
                  <input
                    className="container-3"
                    placeholder="email@email.com"
                    type="email"
                  />
                </div>
                <div className="icon-wrapper">
                  <img className="icon" alt="Icon" src={icon} />
                </div>
              </div>
            </div>
            <div className="password-field">
              <div className="label-wrapper">
                <div className="label">
                  <div className="senha">SENHA</div>
                </div>
              </div>
              <div className="container-4">
                <div className="container-wrapper">
                  <input
                    className="container-3"
                    placeholder="••••••••"
                    type="text"
                  />
                </div>
                <div className="img-wrapper">
                  <img className="img" alt="Icon" src={icon4} />
                </div>
                <div className="button">
                  <div className="container-5">
                    <img className="icon-2" alt="Icon" src={icon2} />
                  </div>
                </div>
              </div>
            </div>
            <div className="CTA-button">
              <div className="text">Entrar</div>
              <div className="container-6">
                <img className="icon-3" alt="Icon" src={icon3} />
              </div>
            </div>
          </div>
          <div className="link">
            <p className="p">
              Esqueceu sua senha? Entre em contato com a equipe para acessar:
            </p>
            <div className="button-css-transform">
              <div className="div-wrapper">
                <div className="text-wrapper-2">Clique aqui</div>
              </div>
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