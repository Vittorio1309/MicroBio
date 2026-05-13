import "../styles/tela_validacao_bioinsumos.css";

const ANALISES = [
  "Contagem de microrganismos viáveis (UFC/ml ou UFC/g)",
  "Análise de pureza e contaminantes",
  "Teste de estabilidade do produto",
  "Avaliação de eficácia em condições controladas",
];

const ETAPAS = [
  {
    num: 1,
    titulo: "Recebimento",
    desc: "Recepção e catalogação das amostras com registro de lote e validade.",
  },
  {
    num: 2,
    titulo: "Processamento em Lab",
    desc: "Preparo das amostras e análises microbiológicas padronizadas.",
  },
  {
    num: 3,
    titulo: "Testes de Eficácia",
    desc: "Ensaios controlados para validar a performance do bioinsumo.",
  },
  {
    num: 4,
    titulo: "Certificação",
    desc: "Emissão de laudo técnico com resultados e parecer de conformidade.",
  },
];

const FORNECE = [
  "Tipo de bioinsumo e formulação",
  "Microrganismo(s) declarado(s) no rótulo",
  "Lote, data de fabricação e validade",
  "Documentação regulatória disponível",
];

const FAQ = [
  {
    pergunta: "Quais normas são seguidas na validação?",
    resposta:
      "Seguimos as normas do MAPA e instruções normativas vigentes para registro e controle de qualidade de bioinsumos.",
  },
  {
    pergunta: "Posso usar o laudo para registro do produto?",
    resposta:
      "Sim, nossos laudos são aceitos como documentação técnica de suporte para processos de registro junto ao MAPA.",
  },
];

export default function ValidacaoBioinsumos() {
  return (
    <div className="vb-page">
      {/* NAV */}
      <nav className="vb-nav">
        <span className="vb-navLogo">MicroBio</span>
        <div className="vb-navLinks">
          <a href="#">Início</a>
          <a href="#" className="vb-active">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </div>
        <a href="#" className="vb-navLogin">Login</a>
      </nav>

      {/* BREADCRUMB */}
      <div className="vb-breadcrumb">
        <a href="#">Início</a>
        <span>/</span>
        <a href="#">Serviços</a>
        <span>/</span>
        <span className="vb-breadcrumbActive">Validação de Bioinsumos</span>
      </div>

      {/* HERO */}
      <section className="vb-hero">
        <div className="vb-heroIcon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
          </svg>
        </div>
        <h1 className="vb-heroTitle">Validação de Bioinsumos</h1>
        <p className="vb-heroDesc">
          A validação de bioinsumos é essencial para assegurar que produtos biológicos atendam
          aos padrões regulatórios e entreguem os resultados esperados no campo. Realizamos
          testes completos de eficácia, estabilidade, contagem microbiana e pureza, fornecendo
          laudos técnicos que certificam a qualidade dos seus bioinsumos.
        </p>
      </section>

      <div className="vb-divider" />

      {/* ANÁLISES REALIZADAS */}
      <section className="vb-section">
        <h2 className="vb-sectionTitle">Análises Realizadas</h2>
        <div className="vb-analisesGrid">
          {ANALISES.map((item) => (
            <div key={item} className="vb-analiseItem">
              <span className="vb-checkIcon">
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
      <section className="vb-section">
        <h2 className="vb-sectionTitle">Etapas do Processo</h2>
        <div className="vb-etapasGrid">
          {ETAPAS.map((etapa) => (
            <div key={etapa.num} className="vb-etapaCard">
              <div className="vb-etapaNum">{etapa.num}</div>
              <h3 className="vb-etapaTitulo">{etapa.titulo}</h3>
              <p className="vb-etapaDesc">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORNECE */}
      <section className="vb-section">
        <h2 className="vb-sectionTitle">O que o cliente precisa fornecer</h2>
        <div className="vb-forneceList">
          {FORNECE.map((item) => (
            <div key={item} className="vb-forneceItem">
              <span className="vb-forneceIcon">
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
      <section className="vb-cta">
        <div className="vb-ctaContent">
          <h2 className="vb-ctaTitle">
            Solicite seu orçamento para<br />Validação de Bioinsumos
          </h2>
          <p className="vb-ctaDesc">Entre em contato e receba uma proposta personalizada.</p>
        </div>
        <a href="#" className="vb-ctaBtn">
          Solicitar Orçamento
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      {/* FAQ */}
      <section className="vb-section">
        <h2 className="vb-sectionTitle">Perguntas Frequentes</h2>
        <div className="vb-faqList">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="vb-faqItem">
              <h3 className="vb-faqPergunta">{item.pergunta}</h3>
              <p className="vb-faqResposta">{item.resposta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vb-footer">
        <span className="vb-footerLogo">MicroBio</span>
        <div className="vb-footerLinks">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className="vb-footerSocials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </footer>
    </div>
  );
}