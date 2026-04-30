import { useState } from "react";
import styles from "../css/orcamento.module.css";
import fundoImg from "../img/Orcamento.avif";

const SERVICES = [
  "Análise de Solo",
  "Consultoria Agronômica",
  "Monitoramento de Pragas",
  "Fertilidade e Nutrição",
];

const CULTURES = ["Soja", "Milho", "Café", "Cana-de-açúcar", "Trigo", "Algodão"];

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    servico: SERVICES[0],
    area: "",
    cultura: CULTURES[0],
    mensagem: "",
    // step 2
    estado: "",
    cidade: "",
    telefone: "",
    urgencia: "normal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido enviado com sucesso! Em breve entraremos em contato.");
  };

  return (
    <div className={styles.page}>
      {/* NAV */}
      <nav className={styles.nav}>
        <span className={styles.navLogo}>MicroBio</span>
        <div className={styles.navLinks}>
          <a href="#" className={styles.active}>Solicitação</a>
          <a href="#">Início</a>
        </div>
      </nav>

      {/* HERO */}
      <div className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${fundoImg})` }}
        />
        <div className={styles.heroOverlay} />

        {/* CARD */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1 className={styles.cardTitle}>Solicitar Orçamento</h1>
            <div className={styles.cardSubtitle}>
              <span>Sua jornada para alta produtividade começa aqui.</span>
              <span className={styles.stepBadge}>{step} / {totalSteps}</span>
            </div>
            <div className={styles.progressTrack}>
              <div
                className={styles.progressFill}
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleNext}>
              {/* CONTACT SECTION */}
              <div className={styles.sectionLabel}>
                <IconUser />
                Informações de Contato
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="nome">Nome Completo</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={form.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">E-mail Corporativo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="joao@empresa.com.br"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="empresa">Nome da Empresa / Fazenda</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="MicroBio Agropecuária Ltda"
                    value={form.empresa}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* SERVICE SECTION */}
              <div className={styles.sectionLabel}>
                <IconChart />
                Detalhes do Serviço
              </div>

              <div className={`${styles.field} ${styles.full}`}>
                <label htmlFor="servico">Tipo de Serviço</label>
                <div className={styles.selectWrap}>
                  <select
                    id="servico"
                    name="servico"
                    value={form.servico}
                    onChange={handleChange}
                  >
                    {SERVICES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.highlightPanel}>
                <div className={styles.field}>
                  <label htmlFor="area">Tamanho da Área (Hectares)</label>
                  <input
                    id="area"
                    name="area"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={form.area}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cultura">Tipo de Cultura</label>
                  <div className={styles.selectWrap}>
                    <select
                      id="cultura"
                      name="cultura"
                      value={form.cultura}
                      onChange={handleChange}
                    >
                      {CULTURES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className={`${styles.field} ${styles.full}`} style={{ marginTop: "14px" }}>
                <label htmlFor="mensagem">Mensagem Adicional (Opcional)</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Descreva brevemente sua necessidade..."
                  value={form.mensagem}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.btnBack} disabled>
                  ← Voltar
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  Próximo Passo
                  <IconArrow />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* LOCATION SECTION */}
              <div className={styles.sectionLabel}>
                <IconPin />
                Localização da Propriedade
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="estado">Estado</label>
                  <input
                    id="estado"
                    name="estado"
                    type="text"
                    placeholder="Ex: Mato Grosso"
                    value={form.estado}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    id="cidade"
                    name="cidade"
                    type="text"
                    placeholder="Ex: Sorriso"
                    value={form.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={`${styles.field} ${styles.full}`}>
                  <label htmlFor="telefone">Telefone de Contato</label>
                  <input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="(65) 99999-0000"
                    value={form.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* URGENCY SECTION */}
              <div className={styles.sectionLabel}>
                <IconClock />
                Urgência do Atendimento
              </div>

              <div className={styles.urgencyGroup}>
                {[
                  { value: "normal", label: "Normal", desc: "Até 5 dias úteis" },
                  { value: "prioritario", label: "Prioritário", desc: "Até 2 dias úteis" },
                  { value: "urgente", label: "Urgente", desc: "Até 24 horas" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`${styles.urgencyCard} ${form.urgencia === opt.value ? styles.urgencyActive : ""}`}
                  >
                    <input
                      type="radio"
                      name="urgencia"
                      value={opt.value}
                      checked={form.urgencia === opt.value}
                      onChange={handleChange}
                    />
                    <span className={styles.urgencyLabel}>{opt.label}</span>
                    <span className={styles.urgencyDesc}>{opt.desc}</span>
                  </label>
                ))}
              </div>

              {/* Summary */}
              <div className={styles.summaryBox}>
                <p className={styles.summaryTitle}>Resumo do Pedido</p>
                <div className={styles.summaryRow}>
                  <span>Serviço</span><span>{form.servico}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Área</span><span>{form.area || "—"} ha</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Cultura</span><span>{form.cultura}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Responsável</span><span>{form.nome || "—"}</span>
                </div>
              </div>

              <div className={styles.actions}>
                <button type="button" className={styles.btnBack} onClick={handleBack}>
                  ← Voltar
                </button>
                <button type="submit" className={styles.btnSubmit}>
                  Enviar Pedido de Orçamento
                  <IconSend />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}>MicroBio</span>
        <div className={styles.footerLinks}>
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className={styles.footerSocials}>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </footer>
    </div>
  );
}

/* ── INLINE SVG ICONS ── */
function IconUser() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M3 17l4-8 4 4 4-6 4 10" />
      <path d="M3 21h18" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
