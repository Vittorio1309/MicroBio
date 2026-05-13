import "../styles/tela_analise_foliar.css";

const ANALISES = [
  "Macronutrientes foliares (N, P, K, Ca, Mg, S)",
  "Micronutrientes foliares (B, Cu, Fe, Mn, Zn, Mo)",
  "Relações nutricionais e índices DRIS",
  "Diagnóstico de deficiências e toxicidades",
];

const ETAPAS = [
  {
    num: 1,
    titulo: "Coleta de Amostra",
    desc: "Coleta de folhas diagnósticas conforme protocolo da cultura e estádio fenológico.",
  },
  {
    num: 2,
    titulo: "Processamento em Lab",
    desc: "Lavagem, secagem, moagem e digestão do material vegetal.",
  },
  {
    num: 3,
    titulo: "Análise",
    desc: "Determinação dos nutrientes por espectrofotometria e absorção atômica.",
  },
  {
    num: 4,
    titulo: "Resultado",
    desc: "Laudo com teores, faixas de suficiência e recomendações de correção.",
  },
];

const FORNECE = [
  "Cultura e variedade",
  "Estádio fenológico da planta",
  "Sintomas visuais observados",
  "Histórico de adubação da safra",
];

const FAQ = [
  {
    pergunta: "Qual a melhor época para coletar folhas?",
    resposta:
      "Varia conforme a cultura. Em geral, no florescimento ou no estádio indicado pelo protocolo técnico da espécie.",
  },
  {
    pergunta: "Quantas folhas devo coletar?",
    resposta:
      "Recomendamos coletar de 20 a 30 folhas por talhão homogêneo, seguindo o padrão de amostragem da cultura.",
  },
];

export default function AnaliseFoliar() {
  return (
    <div className="af-page">
      {/* NAV */}
      <nav className="af-nav">
        <span className="af-navLogo">MicroBio</span>
        <div className="af-navLinks">
          <a href="#">Início</a>
          <a href="#" className="af-active">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </div>
        <a href="#" className="af-navLogin">Login</a>
      </nav>

      {/* BREADCRUMB */}
      <div className="af-breadcrumb">
        <a href="#">Início</a>
        <span>/</span>
        <a href="#">Serviços</a>
        <span>/</span>
        <span className="af-breadcrumbActive">Análise Foliar</span>
      </div>

      {/* HERO */}
      <section className="af-hero">
        <div className="af-heroIcon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C6 2 3 8 3 12c0 5 4 9 9 9s9-4 9-9c0-4-3-10-9-10z" />
            <path d="M12 2c0 0-2 6 0 10s6 4 6 4" />
          </svg>
        </div>
        <h1 className="af-heroTitle">Análise Foliar</h1>
        <p className="af-heroDesc">
          A análise foliar complementa a análise de solo ao avaliar diretamente o estado
          nutricional da planta. Através da quantificação de macro e micronutrientes no tecido
          vegetal, é possível identificar deficiências e excessos que não são evidentes
          visualmente, permitindo correções precisas durante o ciclo da cultura.
        </p>
      </section>

      <div className="af-divider" />

      {/* ANÁLISES REALIZADAS */}
      <section className="af-section">
        <h2 className="af-sectionTitle">Análises Realizadas</h2>
        <div className="af-analisesGrid">
          {ANALISES.map((item) => (
            <div key={item} className="af-analiseItem">
              <span className="af-checkIcon">
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
      <section className="af-section">
        <h2 className="af-sectionTitle">Etapas do Processo</h2>
        <div className="af-etapasGrid">
          {ETAPAS.map((etapa) => (
            <div key={etapa.num} className="af-etapaCard">
              <div className="af-etapaNum">{etapa.num}</div>
              <h3 className="af-etapaTitulo">{etapa.titulo}</h3>
              <p className="af-etapaDesc">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORNECE */}
      <section className="af-section">
        <h2 className="af-sectionTitle">O que o cliente precisa fornecer</h2>
        <div className="af-forneceList">
          {FORNECE.map((item) => (
            <div key={item} className="af-forneceItem">
              <span className="af-forneceIcon">
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
      <section className="af-cta">
        <div className="af-ctaContent">
          <h2 className="af-ctaTitle">
            Solicite seu orçamento para<br />Análise Foliar
          </h2>
          <p className="af-ctaDesc">Entre em contato e receba uma proposta personalizada.</p>
        </div>
        <a href="#" className="af-ctaBtn">
          Solicitar Orçamento
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      {/* FAQ */}
      <section className="af-section">
        <h2 className="af-sectionTitle">Perguntas Frequentes</h2>
        <div className="af-faqList">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="af-faqItem">
              <h3 className="af-faqPergunta">{item.pergunta}</h3>
              <p className="af-faqResposta">{item.resposta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="af-footer">
        <span className="af-footerLogo">MicroBio</span>
        <div className="af-footerLinks">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className="af-footerSocials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </footer>
    </div>
  );
}