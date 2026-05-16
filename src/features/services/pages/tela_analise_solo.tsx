import "../styles/tela_analise_solo.css";

const ANALISES = [
  "Macronutrientes (N, P, K, Ca, Mg, S)",
  "Micronutrientes (B, Cu, Fe, Mn, Zn)",
  "pH em água e CaCl₂",
  "Matéria orgânica",
  "CTC e saturação de bases (%V)",
  "Textura do solo (areia, silte, argila)",
];

const ETAPAS = [
  {
    num: 1,
    titulo: "Coleta de Amostra",
    desc: "Coleta de solo em pontos representativos da área, na profundidade adequada.",
  },
  {
    num: 2,
    titulo: "Processamento em Lab",
    desc: "Secagem, moagem e preparo das amostras para análise química.",
  },
  {
    num: 3,
    titulo: "Análise",
    desc: "Determinação dos nutrientes e parâmetros por métodos padronizados.",
  },
  {
    num: 4,
    titulo: "Resultado",
    desc: "Laudo técnico com resultados, interpretação e recomendações de manejo.",
  },
];

const FORNECE = [
  "Localização da propriedade",
  "Cultura atual e pretendida",
  "Área total em hectares",
  "Histórico de calagem e adubação",
];

const FAQ = [
  {
    pergunta: "Com que frequência devo fazer a análise de solo?",
    resposta:
      "Recomendamos análise anual ou a cada safra para acompanhar a evolução da fertilidade do solo.",
  },
  {
    pergunta: "Quantas amostras preciso coletar?",
    resposta:
      "Depende da área e da variabilidade do terreno. Fornecemos orientações detalhadas para coleta representativa.",
  },
];

export default function AnaliseSolo() {
  return (
    <div className="as-page">
      {/* NAV */}
      <nav className="as-nav">
        <a href="/agro" className="as-navLogo" style={{ textDecoration: "none" }}>MicroBio</a>
        <div className="as-navLinks">
          <a href="#">Início</a>
          <a href="#" className="as-active">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </div>
        <a href="#" className="as-navLogin">Login</a>
      </nav>

      {/* BREADCRUMB */}
      <div className="as-breadcrumb">
        <a href="#">Início</a>
        <span>/</span>
        <a href="#">Serviços</a>
        <span>/</span>
        <span className="as-breadcrumbActive">Análise de Solo</span>
      </div>

      {/* HERO */}
      <section className="as-hero">
        <div className="as-heroIcon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
            <path d="M12 6v6l4 2" />
          </svg>
        </div>
        <h1 className="as-heroTitle">Análise de Solo</h1>
        <p className="as-heroDesc">
          A análise de solo é a base para uma agricultura eficiente e sustentável. Nosso
          laboratório realiza avaliações completas de macro e micronutrientes, pH, matéria
          orgânica, CTC e saturação de bases, fornecendo dados precisos para recomendação
          de adubação e correção do solo que maximizam a produtividade da sua lavoura.
        </p>
      </section>

      <div className="as-divider" />

      {/* ANÁLISES REALIZADAS */}
      <section className="as-section">
        <h2 className="as-sectionTitle">Análises Realizadas</h2>
        <div className="as-analisesGrid">
          {ANALISES.map((item) => (
            <div key={item} className="as-analiseItem">
              <span className="as-checkIcon">
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
      <section className="as-section">
        <h2 className="as-sectionTitle">Etapas do Processo</h2>
        <div className="as-etapasGrid">
          {ETAPAS.map((etapa) => (
            <div key={etapa.num} className="as-etapaCard">
              <div className="as-etapaNum">{etapa.num}</div>
              <h3 className="as-etapaTitulo">{etapa.titulo}</h3>
              <p className="as-etapaDesc">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORNECE */}
      <section className="as-section">
        <h2 className="as-sectionTitle">O que o cliente precisa fornecer</h2>
        <div className="as-forneceList">
          {FORNECE.map((item) => (
            <div key={item} className="as-forneceItem">
              <span className="as-forneceIcon">
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
      <section className="as-cta">
        <div className="as-ctaContent">
          <h2 className="as-ctaTitle">
            Solicite seu orçamento para<br />Análise de Solo
          </h2>
          <p className="as-ctaDesc">Entre em contato e receba uma proposta personalizada.</p>
        </div>
        <a href="#" className="as-ctaBtn">
          Solicitar Orçamento
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      {/* FAQ */}
      <section className="as-section">
        <h2 className="as-sectionTitle">Perguntas Frequentes</h2>
        <div className="as-faqList">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="as-faqItem">
              <h3 className="as-faqPergunta">{item.pergunta}</h3>
              <p className="as-faqResposta">{item.resposta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="as-footer">
        <a href="/agro" className="as-footerLogo" style={{ textDecoration: "none" }}>MicroBio</a>
        <div className="as-footerLinks">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className="as-footerSocials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </footer>
    </div>
  );
}