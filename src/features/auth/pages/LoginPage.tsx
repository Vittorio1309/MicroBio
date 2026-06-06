import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import campoFundo from "../../../assets/img/login/campo-fundo.png";
import "../styles/login.css";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    sessionStorage.removeItem("microbio_token");
    sessionStorage.removeItem("microbio_role");
    localStorage.removeItem("microbio_token");
    localStorage.removeItem("microbio_role");
  }, []);

  return (
    <div className="login-page">
      <div className="background-image">
        <div 
          className="microbio-bg" 
          style={{ backgroundImage: `url(${campoFundo})` }} 
        />
        <div className="overlay-blur" />
      </div>

      <div className="main-login-container">
        <div className="login-card">
          {/* Marca */}
          <div className="brand-header">
            <h1
              className="brand-title"
              onClick={() => navigate("/agro")}
              style={{ cursor: "pointer" }}
            >
              MicroBio
            </h1>
          </div>

          {/* Formulário */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
