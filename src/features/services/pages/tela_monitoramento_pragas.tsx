import "../styles/tela_monitoramento_pragas.css";
import { Footer } from "../../agro/components";
import { NavAbout } from "../../about/components/NavAbout";

const ANALISES = [
  "Extração e quantificação de nematóides do solo",
  "Extração e quantificação de nematóides em raízes",
  "Identificação de gêneros de nematóides fitopatogênicos",
  "Estimativa de população e nível de infestação",
];

const ETAPAS = [
  {
    num: 1,
    titulo: "Coleta de Amostra",
    desc: "Coleta de solo e/ou raízes em pontos representativos da área afetada.",
  },
  {
    num: 2,
    titulo: "Processamento em Lab",
    desc: "Extração de nematóides por métodos padronizados (flotação, Baermann).",
  },
  {
    num: 3,
    titulo: "Análise",
    desc: "Quantificação e identificação morfológica dos gêneros presentes.",
  },
  {
    num: 4,
    titulo: "Resultado",
    desc: "Laudo com contagem por gênero, nível de infestação e recomendações.",
  },
];

const FORNECE = [
  "Tipo de amostra (solo, raiz ou ambos)",
  "Cultura plantada",
  "Área em hectares",
  "Sintomas observados nas plantas",
];

const FAQ = [
  {
    pergunta: "Quando devo fazer o monitoramento?",
    resposta:
      "Sempre que observar sintomas como reboleiras, murcha, amarelecimento ou engrossamento de raízes.",
  },
  {
    pergunta: "Como coletar a amostra corretamente?",
    resposta:
      "Colete solo e raízes na zona da raiz das plantas sintomáticas. Fornecemos orientações detalhadas.",
  },
];

export default function MonitoramentoPragas() {
  return (
    <div className="mp-page">      <NavAbout />


      {/* BREADCRUMB */}
      <div className="mp-breadcrumb">
        <a href="#">Início</a>
        <span>/</span>
        <a href="#">Serviços</a>
        <span>/</span>
        <span className="mp-breadcrumbActive">Monitoramento de Pragas</span>
      </div>

      {/* HERO */}
      <section className="mp-hero">
        <div className="mp-heroIcon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </div>
        <h1 className="mp-heroTitle">Monitoramento de Pragas</h1>
        <p className="mp-heroDesc">
          O monitoramento de pragas é essencial para o manejo integrado e a tomada de decisão
          no campo. Nosso laboratório realiza análises de nematóides, identificação de patógenos
          e avaliação do nível de infestação, fornecendo dados precisos para um controle
          eficiente e econômico das ameaças à sua lavoura.
        </p>
      </section>

      <div className="mp-divider" />

      {/* ANÁLISES REALIZADAS */}
      <section className="mp-section">
        <h2 className="mp-sectionTitle">Análises Realizadas</h2>
        <div className="mp-analisesGrid">
          {ANALISES.map((item) => (
            <div key={item} className="mp-analiseItem">
              <span className="mp-checkIcon">
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
      <section className="mp-section">
        <h2 className="mp-sectionTitle">Etapas do Processo</h2>
        <div className="mp-etapasGrid">
          {ETAPAS.map((etapa) => (
            <div key={etapa.num} className="mp-etapaCard">
              <div className="mp-etapaNum">{etapa.num}</div>
              <h3 className="mp-etapaTitulo">{etapa.titulo}</h3>
              <p className="mp-etapaDesc">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORNECE */}
      <section className="mp-section">
        <h2 className="mp-sectionTitle">O que o cliente precisa fornecer</h2>
        <div className="mp-forneceList">
          {FORNECE.map((item) => (
            <div key={item} className="mp-forneceItem">
              <span className="mp-forneceIcon">
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
      <section className="mp-cta">
        <div className="mp-ctaContent">
          <h2 className="mp-ctaTitle">
            Solicite seu orçamento para<br />Monitoramento de Pragas
          </h2>
          <p className="mp-ctaDesc">Entre em contato e receba uma proposta personalizada.</p>
        </div>
        <a href="/orcamento" className="mp-ctaBtn">
          Solicitar Orçamento
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      {/* FAQ */}
      <section className="mp-section">
        <h2 className="mp-sectionTitle">Perguntas Frequentes</h2>
        <div className="mp-faqList">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="mp-faqItem">
              <h3 className="mp-faqPergunta">{item.pergunta}</h3>
              <p className="mp-faqResposta">{item.resposta}</p>
            </div>
          ))}
        </div>
      </section>      <Footer />
    </div>
  );
}