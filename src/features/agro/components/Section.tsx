// filepath: src/features/agro/components/Section.tsx
import React from "react";
import heroImage from "../../../assets/img/planta-o-moderna-vista-aerea.png";
import arrowIcon from "../../../assets/img/icon-2.svg";
import iconAnalises from "../../../assets/img/svg-1.png";
import iconSustentabilidade from "../../../assets/img/svg-2.png";
import iconConfianca from "../../../assets/img/svg-3.png";
import agronomistImage from "../../../assets/img/Professional Agronomist.png";
import iconAnaliseGenetica from "../../../assets/img/Icon.png";
import iconInsumosBiologicos from "../../../assets/img/Icon (1).png";
import iconPhone from "../../../assets/img/Icon.svg";
import iconEmail from "../../../assets/img/Icon.png";
import iconAddress from "../../../assets/img/Icon (1).png";
import overlay3 from "../../../assets/img/Overlay (3).png";
import overlay4 from "../../../assets/img/Overlay (4).png";
import overlay5 from "../../../assets/img/Overlay (5).png";
import serviceOverlayPainel from "../../../assets/img/icon painel.png";
import serviceOverlayDiagnostico from "../../../assets/img/icon diagnostico.png";
import serviceOverlayConsultoria from "../../../assets/img/icon consultoria.png";
import newsImageDrone from "../../../assets/img/Agricultural field with high tech drone.png";
import newsImageSoybean from "../../../assets/img/Soybean crops healthy growth.png";
import newsImageTechnician from "../../../assets/img/Agricultural technician using tablet in the field.png";

const newsItems = [
  {
    category: "Tecnologia",
    date: "12 Out 2023",
    title: "O impacto da inteligência artificial no mapeamento de pragas",
    image: newsImageDrone,
    href: "https://blog.aegro.com.br/inteligencia-artificial-na-agricultura/",
  },
  {
    category: "Biotecnologia",
    date: "08 Out 2023",
    title: "Novos bioestimulantes prometem aumentar safra em até 15%",
    image: newsImageSoybean,
    href: "https://www.agrolink.com.br/culturas/soja/noticia/nova-tecnologia-da-adama-turbina-produtividade-da-lavoura-e-reduz-efeitos-negativos-do-clima_209532.html",
  },
  {
    category: "Sustentabilidade",
    date: "05 Out 2023",
    title: "Práticas regenerativas: o futuro da fertilidade do solo brasileiro",
    image: newsImageTechnician,
    href: "https://forbes.com.br/forbesagro/2025/01/voce-sabe-o-que-e-agricultura-regenerativa/",
  },
];

/**
 * Section Component
 * Main content section of the Agro page
 * Displays hero, features, and news
 */
export const Section: React.FC = () => {
  return (
    <>
      <section className="hero-section" id="inicio">
        <div className="hero-media">
          <img className="hero-image" src={heroImage} alt="Vista aerea de plantacao" />
          <div className="hero-overlay" />
          <div className="hero-grid" />
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="hero-title">
              Decisões baseadas em dados, colheitas baseadas em resultados.
            </h1>
            <p className="hero-description">
              Análises laboratoriais de solo, água e insumos com a precisão que o
              agronegócio exige.
            </p>
            <div className="hero-actions">
              <button
                className="hero-button hero-button-primary"
                type="button"
                onClick={() => {
                  window.location.href = "/orcamento";
                }}
              >
                Iniciar Análise de Solo
                <img className="hero-button-icon" alt="" src={arrowIcon} />
              </button>
              <button
                className="hero-button hero-button-secondary"
                type="button"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Acessar Resultados
              </button>
            </div>
          </div>
        </div>

        <div className="hero-highlights">
          <article className="highlight-card">
            <div className="highlight-icon-wrap">
              <img className="highlight-icon" src={iconAnalises} alt="" />
            </div>
            <div className="highlight-text">
              <h2 className="highlight-title">Análises Precisas</h2>
              <p className="highlight-description">
                Laudos técnicos com metodologias reconhecidas e certificadas.
              </p>
            </div>
          </article>

          <article className="highlight-card">
            <div className="highlight-icon-wrap">
              <img className="highlight-icon" src={iconSustentabilidade} alt="" />
            </div>
            <div className="highlight-text">
              <h2 className="highlight-title">Sustentabilidade</h2>
              <p className="highlight-description">
                Dados que otimizam o uso de insumos e preservam o solo.
              </p>
            </div>
          </article>

          <article className="highlight-card">
            <div className="highlight-icon-wrap">
              <img className="highlight-icon" src={iconConfianca} alt="" />
            </div>
            <div className="highlight-text">
              <h2 className="highlight-title">Confiança</h2>
              <p className="highlight-description">
                Mais de 1.450 propriedades monitoradas no último ano.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-section" id="sobre">
        <div className="about-container">
          <div className="about-visual">
            <img
              className="about-image"
              src={agronomistImage}
              alt="Profissional agronomo em campo"
            />
            <div className="about-badge">
              <span className="about-badge-label">Expertise Técnica</span>
              <strong>+15 Anos de inovação em biotecnologia agrícola</strong>
            </div>
          </div>

          <div className="about-content">
            <h2 className="about-title">
              Sobre a MicroBio Agro: Onde a Natureza encontra a Alta Tecnologia
            </h2>
            <div className="about-divider" />
            <p className="about-description">
              Nascemos da necessidade de conectar o conhecimento científico de ponta
              diretamente com as mãos de quem produz. A MicroBio Agro não é apenas um
              laboratório, é seu parceiro estratégico na busca pela máxima eficiência
              biológica do solo.
            </p>

            <div className="about-feature-grid">
              <article className="about-feature-card about-feature-card-accent">
                <div className="about-feature-icon-wrap">
                  <img className="about-feature-icon" src={iconAnaliseGenetica} alt="" />
                </div>
                <h3 className="about-feature-title">Análise Genética</h3>
                <p className="about-feature-description">
                  Mapeamento completo da microbiota do solo para decisões assertivas.
                </p>
              </article>

              <article className="about-feature-card about-feature-card-accent">
                <div className="about-feature-icon-wrap">
                  <img className="about-feature-icon" src={iconInsumosBiologicos} alt="" />
                </div>
                <h3 className="about-feature-title">Insumos Biológicos</h3>
                <p className="about-feature-description">
                  Desenvolvimento de soluções sustentáveis e de alta performance.
                </p>
              </article>
            </div>

            <button
              className="about-link"
              type="button"
              onClick={() => {
                window.location.href = "/sobre";
              }}
            >
              Conheça nossa trajetória
              <img className="about-link-icon" alt="" src={iconAnalises} />
            </button>
          </div>
        </div>
      </section>

      <section className="services-section" id="servicos">
        <div className="services-container">
          <div className="services-header">
            <div className="services-copy">
              <h2 className="services-title">Serviços Especializados</h2>
              <p className="services-description">
                Oferecemos uma gama completa de diagnósticos e soluções para
                potencializar cada hectare da sua propriedade.
              </p>
            </div>

            <button className="services-button">Ver todos os serviços</button>
          </div>

          <div className="services-grid">
            <article className="service-card">
              <div className="service-icon-wrap">
                <img className="service-icon" src={serviceOverlayPainel} alt="" />
              </div>
              <h3 className="service-title">Painel de Resultados</h3>
              <p className="service-description">
                Acompanhe em tempo real a evolução da saúde do seu solo através do nosso
                dashboard exclusivo de Agro-Tech Intelligence.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon-wrap">
                <img className="service-icon" src={serviceOverlayDiagnostico} alt="" />
              </div>
              <h3 className="service-title">Diagnóstico Microbiológico</h3>
              <p className="service-description">
                Identificação de patógenos e microrganismos benéficos com precisão
                molecular, garantindo proteção total.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon-wrap">
                <img className="service-icon" src={serviceOverlayConsultoria} alt="" />
              </div>
              <h3 className="service-title">Consultoria Técnica</h3>
              <p className="service-description">
                Suporte direto de nossos doutores em agronomia para interpretar dados e
                aplicar as melhores estratégias biológicas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="news-container">
          <div className="news-header">
            <h2 className="news-title">Últimas Notícias</h2>
            <p className="news-description">
              Fique por dentro das inovações e tendências do agronegócio.
            </p>
          </div>

          <div className="news-grid">
            {newsItems.map((item) => (
              <a
                key={item.title}
                className="news-card"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="news-image" src={item.image} alt={item.title} />
                <div className="news-meta">
                  {item.category} • {item.date}
                </div>
                <h3 className="news-card-title">{item.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-details">
              <p className="contact-eyebrow">Contato</p>
              <h2 className="contact-title">Vamos otimizar sua safra?</h2>
              <p className="contact-description">
                Nossa equipe de especialistas está pronta para diagnosticar suas necessidades e propor as melhores soluções tecnológicas.
              </p>

              <div className="contact-card-grid">
                <article className="contact-card">
                  <div className="contact-card-bg">
    
                  </div>
                  <div className="contact-card-icon">
                    <img src={overlay3} alt="Telefone" />
                  </div>
                  <div>
                    <p className="contact-card-label">Telefone</p>
                    <a className="contact-card-value" href="tel:+5545999865119">
                      (45) 9 9986-5119
                    </a>
                  </div>
                </article>

                <article className="contact-card">
                  <div className="contact-card-bg">
             
                  </div>
                  <div className="contact-card-icon">
                    <img src={overlay5} alt="E-mail" />
                  </div>
                  <div>
                    <p className="contact-card-label">E-mail</p>
                    <a className="contact-card-value" href="mailto:microbiolaboratorio@gmail.com">
                      microbiolaboratorio@gmail.com
                    </a>
                  </div>
                </article>

                <article className="contact-card">
                  <div className="contact-card-bg">
                 
                  </div>
                  <div className="contact-card-icon">
                    <img src={overlay4} alt="Endereço" />
                  </div>
                  <div>
                    <p className="contact-card-label">Endereço</p>
                    <span className="contact-card-value">
                      Rua Adoniran Barbosa, 133 / Jardim Gisela / Toledo - PR
                    </span>
                  </div>
                </article>
              </div>
            </div>

            <div className="contact-map-panel">
              <div className="map-panel">
                <iframe
                  title="Localização MicroBio"
                  src="https://maps.google.com/maps?q=Rua%20Adoniran%20Barbosa%20133%20Jardim%20Gisela%20Toledo%20PR&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                  loading="lazy"
                />
                <div className="map-badge">    
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
