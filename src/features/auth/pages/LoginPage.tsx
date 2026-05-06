import React from "react";
import { LoginForm } from "../components/LoginForm";
import campoFundo from "../../../assets/img/login/campo-fundo.png";
import "../styles/login.css";

export const LoginPage: React.FC = () => {
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
            <h1 className="brand-title">MicroBio</h1>
          </div>

          {/* Formulário */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
