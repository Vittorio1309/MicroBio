import "../styles/tela_consultoria_manejo.css";

const ANALISES = [
  "Interpretação integrada de análises de solo e foliar",
  "Planejamento de adubação e calagem",
  "Estratégia de manejo integrado de pragas (MIP)",
  "Recomendações de uso de bioinsumos",
];

const ETAPAS = [
  {
    num: 1,
    titulo: "Diagnóstico",
    desc: "Levantamento completo de dados da propriedade e históricos necessários.",
  },
  {
    num: 2,
    titulo: "Análises",
    desc: "Realização ou revisão de análises laboratoriais necessárias.",
  },
  {
    num: 3,
    titulo: "Planejamento",
    desc: "Elaboração do plano de manejo personalizado com base nos dados.",
  },
  {
    num: 4,
    titulo: "Acompanhamento",
    desc: "Suporte técnico e monitoramento dos resultados ao longo da safra.",
  },
];

const FORNECE = [
  "Dados da propriedade (área, culturas, rotação)",
  "Histórico de produtividade e manejo",
  "Análises de solo e foliares anteriores",
  "Objetivos e metas de produção",
];

const FAQ = [
  {
    pergunta: "A consultoria inclui visita à propriedade?",
    resposta:
      "Sim, nossos especialistas realizam visitas técnicas para diagnóstico in loco e acompanhamento do plano de manejo.",
  },
  {
    pergunta: "Qual a duração do acompanhamento?",
    resposta:
      "O plano pode ser por safra ou anual, conforme as necessidades e objetivos do produtor.",
  },
];

export default function ConsultoriaManejo() {
  return (
    <div className="cm-page">
      {/* NAV */}
      <nav className="cm-nav">
        <a href="/agro" className="cm-navLogo" style={{ textDecoration: "none" }}>MicroBio</a>
        <div className="cm-navLinks">
          <a href="#">Início</a>
          <a href="#" className="cm-active">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </div>
        <a href="#" className="cm-navLogin">Login</a>
      </nav>

      {/* BREADCRUMB */}
      <div className="cm-breadcrumb">
        <a href="#">Início</a>
        <span>/</span>
        <a href="#">Serviços</a>
        <span>/</span>
        <span className="cm-breadcrumbActive">Consultoria de Manejo</span>
      </div>

      {/* HERO */}
      <section className="cm-hero">
        <div className="cm-heroIcon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 9h6M9 12h6M9 15h4" />
          </svg>
        </div>
        <h1 className="cm-heroTitle">Consultoria de Manejo</h1>
        <p className="cm-heroDesc">
          Nossa consultoria de manejo integra os dados de todas as análises laboratoriais para
          oferecer um planejamento agronômico completo e baseado em evidências. Avaliamos
          saúde do solo, o estado nutricional das culturas e a presença de pragas para construir
          estratégias personalizadas que maximizam a produtividade e a sustentabilidade da sua
          operação.
        </p>
      </section>

      <div className="cm-divider" />

      {/* ANÁLISES REALIZADAS */}
      <section className="cm-section">
        <h2 className="cm-sectionTitle">Análises Realizadas</h2>
        <div className="cm-analisesGrid">
          {ANALISES.map((item) => (
            <div key={item} className="cm-analiseItem">
              <span className="cm-checkIcon">
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
      <section className="cm-section">
        <h2 className="cm-sectionTitle">Etapas do Processo</h2>
        <div className="cm-etapasGrid">
          {ETAPAS.map((etapa) => (
            <div key={etapa.num} className="cm-etapaCard">
              <div className="cm-etapaNum">{etapa.num}</div>
              <h3 className="cm-etapaTitulo">{etapa.titulo}</h3>
              <p className="cm-etapaDesc">{etapa.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORNECE */}
      <section className="cm-section">
        <h2 className="cm-sectionTitle">O que o cliente precisa fornecer</h2>
        <div className="cm-forneceList">
          {FORNECE.map((item) => (
            <div key={item} className="cm-forneceItem">
              <span className="cm-forneceIcon">
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
      <section className="cm-cta">
        <div className="cm-ctaContent">
          <h2 className="cm-ctaTitle">
            Solicite seu orçamento para<br />Consultoria de Manejo
          </h2>
          <p className="cm-ctaDesc">Entre em contato e receba uma proposta personalizada.</p>
        </div>
        <a href="#" className="cm-ctaBtn">
          Solicitar Orçamento
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>

      {/* FAQ */}
      <section className="cm-section">
        <h2 className="cm-sectionTitle">Perguntas Frequentes</h2>
        <div className="cm-faqList">
          {FAQ.map((item) => (
            <div key={item.pergunta} className="cm-faqItem">
              <h3 className="cm-faqPergunta">{item.pergunta}</h3>
              <p className="cm-faqResposta">{item.resposta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cm-footer">
        <a href="/agro" className="cm-footerLogo" style={{ textDecoration: "none" }}>MicroBio</a>
        <div className="cm-footerLinks">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className="cm-footerSocials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </footer>
    </div>
  );
}