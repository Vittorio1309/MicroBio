import { useNavigate } from "react-router-dom";
import "../styles/tela_nossos_servicos.css";

const SERVICOS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 3h18v4H3zM3 10h18M7 14h10M5 18h14" />
      </svg>
    ),
    titulo: "Análise de Solo",
    desc: "Avaliação completa de macro e micronutrientes com precisão laboratorial de ponta para recomendações assertivas.",
    rota: "/analise-solo",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
    titulo: "Controle Biológico",
    desc: "Implementação de soluções naturais e microrganismos benéficos para reduzir a dependência de defensivos químicos.",
    rota: "/controle-biologico",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    titulo: "Monitoramento de Pragas",
    desc: "Vigilância tecnológica e mapeamento geoespacial para detecção precoce de ameaças à cultura.",
    rota: "/monitoramento-pragas",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <circle cx="19" cy="5" r="3" />
      </svg>
    ),
    titulo: "Análise Foliar",
    desc: "Diagnóstico nutricional direto no tecido vegetal para identificar carências ocultas durante o ciclo.",
    rota: "/analise-foliar",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
        <path d="M3 20h18" />
      </svg>
    ),
    titulo: "Consultoria de Manejo",
    desc: "Planejamento estratégico baseado em evidências para maximizar o ROI e a saúde do ecossistema.",
    rota: "/consultoria-manejo",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
      </svg>
    ),
    titulo: "Validação de Bioinsumos",
    desc: "Testes de eficácia e certificação de produtos biológicos para garantir qualidade e segurança.",
    rota: "/validacao-bioinsumos",
  },
];

export default function NossosServicos() {
  const navigate = useNavigate();

  return (
    <div className="ns-page">
      {/* NAV */}
      <nav className="ns-nav">
        <span className="ns-navLogo">MicroBio</span>
        <div className="ns-navLinks">
          <a href="#">Início</a>
          <a href="#" className="ns-active">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Contato</a>
        </div>
        <div className="ns-navActions">
          <a href="#" className="ns-navLogin">Login</a>
          <a href="#" className="ns-navCta">Solicitar Orçamento</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="ns-hero">
        <h1 className="ns-heroTitle">Nossos Serviços</h1>
        <p className="ns-heroDesc">
          Combinamos ciência laboratorial rigorosa com inteligência de dados para
          otimizar a produtividade e sustentabilidade da sua lavoura.
        </p>
      </section>

      {/* GRID DE SERVIÇOS */}
      <section className="ns-grid-section">
        <div className="ns-grid">
          {SERVICOS.map((s) => (
            <div
              key={s.titulo}
              className="ns-card"
              onClick={() => navigate(s.rota)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(s.rota)}
            >
              <div className="ns-cardInner">
                <div className="ns-cardIcon">{s.icon}</div>
                <h3 className="ns-cardTitulo">{s.titulo}</h3>
                <p className="ns-cardDesc">{s.desc}</p>
                <div className="ns-cardLink">
                  Saber mais
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ns-cardGlow" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="ns-cta">
        <div className="ns-ctaContent">
          <h2 className="ns-ctaTitle">Pronto para transformar sua produção?</h2>
          <p className="ns-ctaDesc">
            Nossos especialistas estão prontos para criar um plano personalizado para sua propriedade.
          </p>
        </div>
        <a href="#" className="ns-ctaBtn">Fale com um Especialista</a>
      </section>

      {/* FOOTER */}
      <footer className="ns-footer">
        <span className="ns-footerLogo">MicroBio</span>
        <div className="ns-footerLinks">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className="ns-footerSocials">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </footer>
    </div>
  );
}