import { useState } from "react";
import styles from "../styles/orcamento.module.css";
import fundoImg from "../../../assets/img/orcamento/Imagem_fundo_tela_orcamento_Micro_Bio.jpeg";
import { Footer } from "../components";

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
    estado: "",
    cidade: "",
    telefone: "",
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
          <span className={styles.active}>Solicitação</span>
        </div>
      </nav>

      {/* HERO */}
      <div className={styles.hero}>
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${fundoImg})` }}
        />
        <div className={styles.heroOverlay} />

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

          {/* STEP 1 */}
          {step === 1 ? (
            <form onSubmit={handleNext}>
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

              <div className={styles.actions}>
                <button type="submit" className={styles.btnSubmit}>
                  Próximo Passo
                </button>
              </div>
            </form>
          ) : (

          /* STEP 2 */
            <form onSubmit={handleSubmit}>
              <div className={styles.sectionLabel}>
                <IconPin />
                Localização da Propriedade
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Estado</label>
                  <input name="estado" value={form.estado} onChange={handleChange} required />
                </div>

                <div className={styles.field}>
                  <label>Cidade</label>
                  <input name="cidade" value={form.cidade} onChange={handleChange} required />
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <label>Telefone</label>
                  <input name="telefone" value={form.telefone} onChange={handleChange} required />
                </div>
              </div>

              <div className={`${styles.field} ${styles.full}`} style={{ marginTop: "16px" }}>
                <label>Detalhes da Necessidade</label>
                <textarea
                  name="mensagem"
                  placeholder="Descreva sua necessidade..."
                  value={form.mensagem}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.actions}>
                <button type="button" onClick={handleBack} className={styles.btnBack}>
                  ← Voltar
                </button>

                <button type="submit" className={styles.btnSubmit}>
                  Enviar Pedido
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ICONS */
function IconUser() {
  return <svg width="14" height="14"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>;
}
function IconChart() {
  return <svg width="14" height="14"><path d="M3 17l4-8 4 4 4-6 4 10"/></svg>;
}
function IconPin() {
  return <svg width="14" height="14"><circle cx="12" cy="9" r="2"/></svg>;
}