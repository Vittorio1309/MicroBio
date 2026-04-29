// filepath: src/pages/LoginPage.tsx
import "../styles/login.css";

export const LoginPage = () => {
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};