import React, { useEffect, useState } from "react";
import styles from "../styles/orcamento.module.css";
import fundoImg from "../../../assets/img/orcamento/Imagem_fundo_tela_orcamento_Micro_Bio.jpeg";
import { Footer } from "../components";

interface Pergunta {
  id: number;
  pergunta: string;
  obrigatoria: boolean;
}

interface Servico {
  id: number;
  nome: string;
  perguntas: Pergunta[];
}

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const [services, setServices] = useState<Servico[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    servicoId: 0,
    mensagem: "",
    estado: "",
    cidade: "",
    telefone: "",
  });

  const [respostas, setRespostas] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch("/api/servicos")
      .then((r) => r.json())
      .then((data: Servico[]) => {
        setServices(data);
        if (data.length > 0) setForm((f) => ({ ...f, servicoId: data[0].id }));
      })
      .catch(() => {});
  }, []);

  // Reset respostas ao trocar de serviço
  useEffect(() => {
    setRespostas({});
  }, [form.servicoId]);

  const selectedService = services.find((s) => s.id === form.servicoId);
  const questions = selectedService?.perguntas ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "servicoId" ? Number(value) : value }));
  };

  const handleRespostaChange = (perguntaId: number, value: string) => {
    setRespostas((prev) => ({ ...prev, [perguntaId]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    // Valida perguntas obrigatórias antes de enviar
    const mandatoryUnanswered = questions.filter(
      (q) => q.obrigatoria && !respostas[q.id]?.trim()
    );
    if (mandatoryUnanswered.length > 0) {
      setSubmitError(
        `Responda as perguntas obrigatórias: ${mandatoryUnanswered.map((q) => q.pergunta).join("; ")}`
      );
      setSubmitting(false);
      return;
    }

    try {
      // 1. Busca ou cadastra a pessoa pelo email
      let pessoaId: number;

      const pessoaRes = await fetch("/api/pessoas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: form.nome, email: form.email, telefone: form.telefone }),
      });

      if (!pessoaRes.ok) {
        const err = await pessoaRes.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Erro ao cadastrar contato");
      }

      const pessoa = await pessoaRes.json() as { id: number };
      pessoaId = pessoa.id;

      // 2. Monta observação com dados gerais (empresa, localização, mensagem)
      const observacao = [
        form.empresa ? `Empresa: ${form.empresa}` : null,
        `Estado: ${form.estado}`,
        `Cidade: ${form.cidade}`,
        form.mensagem ? `Detalhes: ${form.mensagem}` : null,
      ]
        .filter(Boolean)
        .join(" | ");

      // 3. Monta array de respostas às perguntas do serviço
      const respostasArray = questions
        .filter((q) => respostas[q.id]?.trim())
        .map((q) => ({
          perguntaId: q.id,
          pergunta: q.pergunta,
          resposta: respostas[q.id],
        }));

      // 4. Cria o orçamento com as respostas
      const orcRes = await fetch("/api/orcamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pessoaId,
          servicoId: form.servicoId || null,
          status: "PENDENTE",
          observacao,
          respostas: respostasArray,
        }),
      });

      if (!orcRes.ok) {
        const err = await orcRes.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Erro ao registrar orçamento");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao enviar pedido. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setRespostas({});
    setForm({
      nome: "",
      email: "",
      empresa: "",
      servicoId: services[0]?.id ?? 0,
      mensagem: "",
      estado: "",
      cidade: "",
      telefone: "",
    });
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <nav className={styles.nav}>
          <span className={styles.navLogo}>MicroBio</span>
        </nav>
        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${fundoImg})` }} />
          <div className={styles.heroOverlay} />
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h1 className={styles.cardTitle}>Pedido Enviado!</h1>
              <div className={styles.cardSubtitle}>
                <span>Nossa equipe entrará em contato em breve.</span>
              </div>
            </div>
            <div style={{ padding: "24px 0", textAlign: "center" }}>
              <p style={{ fontSize: "0.95rem", color: "#4a5240", marginBottom: "20px" }}>
                Recebemos sua solicitação de orçamento com sucesso.
              </p>
              <button className={styles.btnSubmit} onClick={resetForm}>
                Nova Solicitação
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
        <div className={styles.heroBg} style={{ backgroundImage: `url(${fundoImg})` }} />
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
                  <label htmlFor="email">E-mail</label>
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
                Tipo de Serviço
              </div>

              <div className={`${styles.field} ${styles.full}`}>
                <label htmlFor="servicoId">Selecione o Serviço</label>
                <div className={styles.selectWrap}>
                  <select
                    id="servicoId"
                    name="servicoId"
                    value={form.servicoId}
                    onChange={handleChange}
                  >
                    {services.length === 0 && (
                      <option value={0}>Carregando serviços...</option>
                    )}
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.nome}</option>
                    ))}
                  </select>
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

              {/* Perguntas dinâmicas do serviço selecionado */}
              {questions.length > 0 && (
                <>
                  <div className={styles.sectionLabel}>
                    <IconChart />
                    Informações do Serviço
                    {questions.some((q) => q.obrigatoria) && (
                      <span style={{ fontSize: "0.75rem", color: "#888", marginLeft: "8px" }}>
                        (* obrigatório)
                      </span>
                    )}
                  </div>
                  {questions.map((q) => (
                    <div key={q.id} className={`${styles.field} ${styles.full}`}>
                      <label>
                        {q.pergunta}
                        {q.obrigatoria && <span style={{ color: "#c0392b" }}> *</span>}
                      </label>
                      <input
                        type="text"
                        value={respostas[q.id] ?? ""}
                        onChange={(e) => handleRespostaChange(q.id, e.target.value)}
                        required={q.obrigatoria}
                        placeholder="Digite sua resposta..."
                      />
                    </div>
                  ))}
                </>
              )}

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
                <label>Detalhes Adicionais</label>
                <textarea
                  name="mensagem"
                  placeholder="Descreva outras necessidades ou observações..."
                  value={form.mensagem}
                  onChange={handleChange}
                />
              </div>

              {submitError && (
                <p style={{ color: "#c0392b", fontSize: "0.85rem", marginTop: "8px", textAlign: "center" }}>
                  {submitError}
                </p>
              )}

              <div className={styles.actions}>
                <button type="button" onClick={handleBack} className={styles.btnBack}>
                  ← Voltar
                </button>

                <button type="submit" className={styles.btnSubmit} disabled={submitting}>
                  {submitting ? "Enviando..." : "Enviar Pedido"}
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
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>;
}
function IconChart() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M3 17l4-8 4 4 4-6 4 10"/></svg>;
}
function IconPin() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2"/></svg>;
}
