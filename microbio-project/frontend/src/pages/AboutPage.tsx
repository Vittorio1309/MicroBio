import React from 'react';
import { NavAbout } from '../features/agro/components/NavAbout';
import heroImg from "../../../assets/sobre/AB6AXuCaN7g8OuMkKTWcEfu8vk-cPrpUAseYN-ldewPQ49SglIItWrkQBq39QqM9SIKVhLIOW4b2vL5eMOV62IQMlzVzhEO5mBRpZoktavkcTGy6eNWnGVCrcwmcmmlv45t57oe3Pq64160pMMPilXSxtd2eJ5mjfh78_e6-wfHn25TIDLKk37Q_ElGTTPJ93SG-FpZUdLlTGJMgF71FG4.png";
import mockupImg from "../../../assets/sobre/{41D48DEF-8831-4905-B9CF-D83D6E1F86A8} 1.png";
import '../styles/sobre.css';
import escolherImg from "../../../assets/sobre/foto.png";
import expansaoImg from "../../../assets/sobre/AB6AXuD67U2-HxEiGhp7CkVk6h9aCouuN8n8de8DYAwhljzeZyKcdPv4L9_wCJGVxtwo8cPwb13_g8YfbzyqDi1S7CAF177vTptOmo-_99yh4I4jDpKw1YTfvQSlojsYOfvp_jSL2f0vMgD_HVFM1XCLxnlnz8Bj_MYKnGpj9s1GWLak8GROMM1lYvrueB4XCuqBrkAOUmzPEqm2H17woh.png";
import { Footer } from '../../agro/components/Footer';

export const AboutPage: React.FC = () => {
  return (
    <div className="sobre-page">
      <NavAbout />

      {/* Hero */}
      <section
        className="sobre-hero-banner"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="sobre-hero-overlay" />
        <div className="sobre-hero-content">
          <span className="sobre-hero-label">CONHE&Ccedil;A NOSSA TRAJET&Oacute;RIA</span>
          <h1 className="sobre-hero-title">Sobre N&oacute;s</h1>
          <p className="sobre-hero-desc">
            Ci&ecirc;ncia aplicada ao campo para transformar a<br />
            produtividade brasileira atrav&eacute;s da intelig&ecirc;ncia<br />
            microbiol&oacute;gica.
          </p>
        </div>
      </section>

      {/* Jornada */}
      <section className="jornada-section">
        <div className="jornada-left">
          <span className="jornada-tag">DESDE 2018</span>
          <h2 className="jornada-titulo">
            Uma jornada de inova&ccedil;&atilde;o entre a microbiologia e a agronomia.
          </h2>
          <p className="jornada-texto">
            A MicroBio nasceu do desejo de unir o rigor cient&iacute;fico do laborat&oacute;rio com a
            realidade pr&aacute;tica do campo. Desde o nosso in&iacute;cio, focamos em decifrar a vida
            invis&iacute;vel que sustenta a agricultura de alta performance.
          </p>
          <p className="jornada-texto">
            Entendemos que o solo n&atilde;o &eacute; apenas um substrato, mas um ecossistema vivo.
            Nossa miss&atilde;o &eacute; fornecer as ferramentas anal&iacute;ticas para que produtores e
            empresas possam gerenciar essa vida com precis&atilde;o matem&aacute;tica.
          </p>
        </div>

        <div className="jornada-right">
          <div className="jornada-card">
            <div className="jornada-card-header">
              <h3 className="jornada-card-anos">6+ Anos</h3>
              <p className="jornada-card-subtitulo">
                TRANSFORMANDO DADOS EM<br />
                PRODUTIVIDADE<br />
                SUSTENT&Aacute;VEL.
              </p>
            </div>
            <div className="jornada-card-mockup">
              <img src={mockupImg} alt="MicroBio plataforma" className="jornada-mockup-img" />
            </div>
          </div>
        </div>
      </section>

{/* Nossa Atuação */}
<section className="atuacao-section">
  <div className="atuacao-header">
    <h2 className="atuacao-titulo">Nossa Atua&ccedil;&atilde;o</h2>
    <p className="atuacao-subtitulo">
      Excel&ecirc;ncia t&eacute;cnica em dois pilares fundamentais para o sucesso do agroneg&oacute;cio moderno.
    </p>
  </div>

  <div className="atuacao-cards">
    <div className="atuacao-card">
      <div className="atuacao-card-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h12" />
          <path d="M12 18v-3" />
          <path d="M8 9l1.5-5h5L16 9" />
          <rect x="7" y="9" width="10" height="6" rx="1" />
          <path d="M10 9V7" />
          <path d="M14 9V7" />
        </svg>
      </div>
      <h3 className="atuacao-card-titulo">Controle de Qualidade Microbiol&oacute;gica</h3>
      <p className="atuacao-card-texto">
        Garantia absoluta de pureza e concentra&ccedil;&atilde;o para insumos biol&oacute;gicos.
        Analisamos cada detalhe para assegurar que o que chega ao campo tenha a m&aacute;xima
        efici&ecirc;ncia biol&oacute;gica prometida.
      </p>
    </div>

    <div className="atuacao-card">
      <div className="atuacao-card-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6" />
          <path d="M10 3v6l-4 9h12l-4-9V3" />
          <path d="M8 17h2" />
          <path d="M12 15h2" />
        </svg>
      </div>
      <h3 className="atuacao-card-titulo">An&aacute;lises Agron&ocirc;micas Avan&ccedil;adas</h3>
      <p className="atuacao-card-texto">
        Diagn&oacute;sticos precisos de solo, &aacute;gua e material vegetal. Utilizamos
        tecnologia de ponta para fornecer dados que embasam decis&otilde;es
        estrat&eacute;gicas de fertilidade e prote&ccedil;&atilde;o de cultivos.
      </p>
    </div>
  </div>
</section>

{/* Por que escolher */}
<section className="escolher-section">
  <div className="escolher-left">
    <h2 className="escolher-titulo">
      Por que escolher a MicroBio?
    </h2>

    <div className="escolher-item">
      <div className="escolher-item-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <div>
        <h4 className="escolher-item-titulo">Corpo T&eacute;cnico Qualificado</h4>
        <p className="escolher-item-texto">
          Equipe formada por mestres e doutores com vasta experi&ecirc;ncia em
          microbiologia aplicada e biotecnologia agr&iacute;cola.
        </p>
      </div>
    </div>

    <div className="escolher-item">
      <div className="escolher-item-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
          <path d="M2 2l20 20" />
          <path d="M10.32 10.32A4 4 0 0 0 8 14" />
          <path d="M14 8a4 4 0 0 1 1.68 6.32" />
          <path d="M6.5 6.5a10 10 0 0 0 10 10" />
        </svg>
      </div>
      <div>
        <h4 className="escolher-item-titulo">Assist&ecirc;ncia T&eacute;cnica Consultiva</h4>
        <p className="escolher-item-texto">
          N&atilde;o entregamos apenas laudos. Oferecemos suporte
          especializado para a interpreta&ccedil;&atilde;o de resultados e tomada de
          decis&atilde;o.
        </p>
      </div>
    </div>
  </div>

  <div className="escolher-right">
    <div className="escolher-img-wrapper">
      <img src={escolherImg} alt="MicroBio tecnologia" className="escolher-img" />
    </div>
  </div>
</section>

{/* Quote + Valores */}
<section className="quote-section">
  <div className="quote-content">
    <span className="quote-aspas">99</span>
    <h2 className="quote-texto">
      An&aacute;lises precisas que transformam{' '}
      <span className="quote-destaque">dados em qualidade.</span>
    </h2>
    <div className="quote-linha" />
  </div>
</section>

<section className="valores-section">
  <h3 className="valores-titulo">Nossos Valores</h3>

  <div className="valores-grid">
    <div className="valores-item">
      <div className="valores-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>
      <h4 className="valores-item-titulo">Agilidade</h4>
      <p className="valores-item-texto">Respostas r&aacute;pidas no tempo da safra brasileira.</p>
    </div>

    <div className="valores-item">
      <div className="valores-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h12" />
          <path d="M12 18v-3" />
          <path d="M8 9l1.5-5h5L16 9" />
          <rect x="7" y="9" width="10" height="6" rx="1" />
          <path d="M10 9V7" />
          <path d="M14 9V7" />
        </svg>
      </div>
      <h4 className="valores-item-titulo">Precis&atilde;o</h4>
      <p className="valores-item-texto">Rigor anal&iacute;tico em cada amostra processada.</p>
    </div>

    <div className="valores-item">
      <div className="valores-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </div>
      <h4 className="valores-item-titulo">Qualidade na entrega</h4>
      <p className="valores-item-texto">Informa&ccedil;&otilde;es claras, &uacute;teis e transformadoras.</p>
    </div>

    <div className="valores-item">
      <div className="valores-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#177245" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </div>
      <h4 className="valores-item-titulo">Compromisso</h4>
      <p className="valores-item-texto">Parceria real com o sucesso do produtor.</p>
    </div>
  </div>
</section>
{/* Expansão 2024 */}
<section className="expansao-wrapper">
  <div className="expansao-card">
    <div className="expansao-left">
      <span className="expansao-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        EXPANS&Atilde;O 2024
      </span>

      <h2 className="expansao-titulo">
        Evoluindo para estar mais perto de voc&ecirc;.
      </h2>

      <p className="expansao-texto">
        O ano de 2024 marca um novo cap&iacute;tulo em nossa hist&oacute;ria.
        Com a abertura da nossa primeira filial estrat&eacute;gica e o
        aumento exponencial do nosso portf&oacute;lio de an&aacute;lises
        moleculares, estamos prontos para os pr&oacute;ximos desafios do
        agro-tech.
      </p>

      <div className="expansao-stats">
        <div className="expansao-stat">
          <span className="expansao-stat-valor">Nova Filial</span>
          <span className="expansao-stat-label">AGILIDADE LOG&Iacute;STICA</span>
        </div>
        <div className="expansao-stat">
          <span className="expansao-stat-valor">+200%</span>
          <span className="expansao-stat-label">NOVO PORTF&Oacute;LIO</span>
        </div>
      </div>
    </div>

    <div className="expansao-right">
      <img src={expansaoImg} alt="Nova filial MicroBio" className="expansao-img" />
    </div>
  </div>
</section>

      <Footer />

    </div>
    
  );


  
};