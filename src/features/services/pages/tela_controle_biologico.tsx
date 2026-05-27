import "../styles/tela_controle_biologico.css";
import { Footer } from "../../agro/components";
import { NavAbout } from "../../about/components/NavAbout";

const ANALISES = [
  "Contagem de microrganismos viáveis (UFC ou esporos)",
  "Análise de pureza microbiológica",
  "Identificação de agentes de biocontrole",
  "Avaliação de viabilidade de formulações biológicas",
];

const ETAPAS = [
  {
    num: 1,
    titulo: "Coleta de Amostra",
    desc: "Coleta asséptica do bioinsumo seguindo protocolo técnico com materiais estéreis.",
  },
  {
    num: 2,
    titulo: "Processamento em Lab",
    desc: "Diluições seriadas e plaqueamento em meios de cultura específicos.",
  },
  {
    num: 3,
    titulo: "Análise",
    desc: "Incubação controlada, contagem de colônias e verificação de pureza.",
  },
  {
    num: 4,
    titulo: "Resultado",
    desc: "Laudo técnico com contagens e parecer sobre conformidade do produto.",
  },
];

const FORNECE = [
  "Tipo de bioinsumo (inoculante, biodefensivo, outro)",
  "Microrganismo alvo do produto",
  "Quantidade de amostras",
  "Lote e data de fabricação",
];

const FAQ = [
  {
    pergunta: "Quais bioinsumos podem ser analisados?",
    resposta:
      "Inoculantes, biodefensivos, biofertilizantes, caldas biológicas e produtos à base de microrganismos.",
  },
  {
    pergunta: "Qual o prazo para os resultados?",
    resposta:
      "De 5 a 10 dias úteis, dependendo do tipo de microrganismo e análise solicitada.",
  },
];

export default function ControleBiologico() {
  return (
    <div className="cb-page">      <NavAbout />


      {/* BREADCRUMB */}
      <div className="cb-breadcrumb">
        <a href="#">Início</a>
        <span>/</span>
        <a href="#">Serviços</a>
        <span>/</span>
        <span className="cb-breadcrumbActive">Controle Biológico</span>
      </div>

      {/* HERO */}
      <section className="cb-hero">
        <div className="cb-heroIcon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
          </svg>
        </div>
        <h1 className="cb-heroTitle">Controle Biológico</h1>
        <p className="cb-heroDesc">
          O controle biológico é uma estratégia sustentável que utiliza microrganismos benéficos
          para combater pragas e doenças. Nosso laboratório realiza análises de qualidade de
          bioinsumos, contagem de microrganismos viáveis e análise de pureza microbiológica,
          garantindo a eficácia dos produtos biológicos utilizados no campo.
        </p>
      </section>

      <div className="cb-divider" />

      {/* ANÁLISES REALIZADAS */}
      <section className="cb-section">
        <h2 className="cb-sectionTitle">Análises Realizadas</h2>
        <div className="cb-analisesGrid">
          {ANALISES.map((item) => (
            <div key={item} className="cb-analiseItem">
              <span className="cb-checkIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ETAPAS */}
      <section className="cb-section">
        <h2 className="cb-sectionTitle">Etapas do Processo</h2>
        <div className="cb-etapasGrid">
          {ETAPAS.map((etapa) => (
            <div key={etapa.num} className="cb-etapaCard">
              <div className="cb-etapaNum">{etapa.num}</div>
              <h3 className="cb-etapaTitulo">{etapa.titulo}</h3>
              <p className="cb-etapaDesc">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORNECE */}
      <section className="cb-section">
        <h2 className="cb-sectionTitle">O que o cliente precisa fornecer</h2>
        <div className="cb-forneceList">
          {FORNECE.map((item) => (
            <div key={item} className="cb-forneceItem">
              <span className="cb-forneceIcon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cb-cta">
        <div className="cb-ctaContent">
          <h2 className="cb-ctaTitle">
            Solicite seu orçamento para<br />Controle Biológico
          </h2>
          <p className="cb-ctaDesc">Entre em contato e receba uma proposta personalizada.</p>
        </div>
        <a href="/orcamento" className="cb-ctaBtn">
          Solicitar Orçamento
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      {/* FAQ */}
      <section className="cb-section">
        <h2 className="cb-sectionTitle">Perguntas Frequentes</h2>
        <div className="cb-faqList">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="cb-faqItem">
              <h3 className="cb-faqPergunta">{item.pergunta}</h3>
              <p className="cb-faqResposta">{item.resposta}</p>
            </div>
          ))}
        </div>
      </section>      <Footer />
    </div>
  );
}