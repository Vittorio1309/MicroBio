import { useState, useEffect } from "react";
import "../styles/Clientes.css";

function getAuthHeader() {
  const token = sessionStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchJson(url, options) {
  const r = await fetch(url, options);
  if (!r.ok) {
    const body = await r.json().catch(() => ({}));
    throw new Error(body.message || `Erro ${r.status}`);
  }
  return r.status === 204 ? null : r.json();
}

const EMPTY_FORM = { nome: "", descricao: "", preco: "", pergunta1: "", pergunta2: "", pergunta3: "" };

export default function TiposExame() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    loadServicos();
  }, []);

  async function loadServicos() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson("/api/servicos", { headers: getAuthHeader() });
      setServicos(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar tipos de exame.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = servicos.filter((s) =>
    s.nome.toLowerCase().includes(search.toLowerCase())
  );

  const openNovo = () => {
    setForm(EMPTY_FORM);
    setSaveError("");
    setConfirmDelete(false);
    setModal({ mode: "novo" });
  };

  const openEditar = (s) => {
    const perguntas = s.perguntas || [];
    setForm({
      nome: s.nome,
      descricao: s.descricao ?? "",
      preco: s.preco != null ? String(s.preco) : "",
      pergunta1: perguntas[0]?.pergunta ?? "",
      pergunta2: perguntas[1]?.pergunta ?? "",
      pergunta3: perguntas[2]?.pergunta ?? "",
    });
    setSaveError("");
    setConfirmDelete(false);
    setModal({ mode: "editar", id: s.id });
  };

  const closeModal = () => {
    setModal(null);
    setConfirmDelete(false);
    setSaveError("");
  };

  const handleSave = async () => {
    if (!form.nome.trim()) {
      setSaveError("O nome do tipo de exame é obrigatório.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const body = {
        nome: form.nome.trim(),
        descricao: form.descricao.trim() || null,
        preco: form.preco ? parseFloat(form.preco) : null,
        perguntas: [form.pergunta1.trim(), form.pergunta2.trim(), form.pergunta3.trim()],
      };
      if (modal.mode === "novo") {
        await fetchJson("/api/servicos", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify(body),
        });
      } else {
        await fetchJson(`/api/servicos/${modal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify(body),
        });
      }
      closeModal();
      await loadServicos();
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setSaveError("");
    try {
      await fetchJson(`/api/servicos/${modal.id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      closeModal();
      await loadServicos();
    } catch (err) {
      setSaveError(err.message || "Erro ao excluir tipo de exame.");
      setConfirmDelete(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="clientes-page">
      <h1 className="page-title">Tipos de Exame</h1>

      <div className="clientes-topbar">
        <input
          type="text"
          className="clientes-search"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={openNovo}>
          Novo Tipo
        </button>
      </div>

      {loading && <p className="clientes-empty">Carregando tipos de exame...</p>}
      {error && <p className="clientes-empty" style={{ color: "#c0392b" }}>{error}</p>}

      {!loading && !error && (
        <div className="clientes-list">
          {filtered.length === 0 && (
            <p className="clientes-empty">Nenhum tipo de exame encontrado.</p>
          )}
          {filtered.map((s) => (
            <div key={s.id} className="cliente-row">
              <span className="cliente-nome">{s.nome}</span>
              <span className="cliente-cpf">
                {s.preco != null ? `R$ ${parseFloat(s.preco).toFixed(2)}` : "—"}
              </span>
              <span className="cliente-cpf" style={{ minWidth: "110px" }}>
                {s.perguntas?.length > 0 ? `${s.perguntas.length} pergunta${s.perguntas.length > 1 ? "s" : ""}` : "Sem perguntas"}
              </span>
              <span className="cliente-email">{s.descricao || "—"}</span>
              <button className="btn-primary btn-sm" onClick={() => openEditar(s)}>Editar</button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modal.mode === "novo" ? "Novo Tipo de Exame" : "Editar Tipo de Exame"}
            </h2>
            <div className="modal-fields">
              <div className="modal-field">
                <label className="form-label">Nome</label>
                <input
                  className="modal-input"
                  placeholder="Ex: Análise de Solo"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Descrição (opcional)</label>
                <input
                  className="modal-input"
                  placeholder="Descrição do serviço"
                  value={form.descricao}
                  onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Preço (opcional)</label>
                <input
                  className="modal-input"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.preco}
                  onChange={(e) => setForm((f) => ({ ...f, preco: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Pergunta 1</label>
                <input
                  className="modal-input"
                  placeholder="Pergunta 1"
                  value={form.pergunta1}
                  onChange={(e) => setForm((f) => ({ ...f, pergunta1: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Pergunta 2</label>
                <input
                  className="modal-input"
                  placeholder="Pergunta 2"
                  value={form.pergunta2}
                  onChange={(e) => setForm((f) => ({ ...f, pergunta2: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Pergunta 3</label>
                <input
                  className="modal-input"
                  placeholder="Pergunta 3"
                  value={form.pergunta3}
                  onChange={(e) => setForm((f) => ({ ...f, pergunta3: e.target.value }))}
                />
              </div>
            </div>

            {saveError && (
              <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: "0 0 12px" }}>
                {saveError}
              </p>
            )}

            {modal.mode === "editar" && confirmDelete && (
              <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", fontSize: "0.88rem", color: "#856404" }}>
                Tem certeza que deseja excluir este tipo de exame? Orçamentos vinculados podem ser afetados.
              </div>
            )}

            <div className="modal-actions">
              {modal.mode === "editar" && !confirmDelete && (
                <button
                  className="btn-secondary"
                  style={{ marginRight: "auto", color: "#c0392b", borderColor: "#c0392b" }}
                  onClick={() => setConfirmDelete(true)}
                  disabled={saving}
                >
                  Excluir
                </button>
              )}
              {modal.mode === "editar" && confirmDelete && (
                <>
                  <button
                    className="btn-secondary"
                    style={{ marginRight: "auto" }}
                    onClick={() => setConfirmDelete(false)}
                    disabled={saving}
                  >
                    Cancelar exclusão
                  </button>
                  <button
                    style={{ background: "#c0392b", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" }}
                    onClick={handleDelete}
                    disabled={saving}
                  >
                    {saving ? "Excluindo..." : "Confirmar exclusão"}
                  </button>
                </>
              )}
              {!confirmDelete && (
                <>
                  <button className="btn-secondary" onClick={closeModal} disabled={saving}>Cancelar</button>
                  <button className="btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
