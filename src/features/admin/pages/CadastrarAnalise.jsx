import { useState, useEffect, useRef } from "react";
import "../styles/CadastrarAnalise.css";

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function fetchJson(url, options) {
  const r = await fetch(url, options);
  if (!r.ok) {
    const body = await r.json().catch(() => ({}));
    throw new Error(body.message || `Erro ${r.status}`);
  }
  return r.json();
}

export default function CadastrarAnalise({ navigate }) {
  const [usuarios,  setUsuarios]  = useState([]);
  const [loadError, setLoadError] = useState("");
  const [form, setForm] = useState({
    usuarioId: "",
    descricao: "",
    laudo: "",
  });
  const [arquivo,   setArquivo]   = useState(null);
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchJson("/api/admin/usuarios?role=USER", { headers: getAuthHeader() })
      .then((us) => setUsuarios(us))
      .catch((err) => setLoadError(err.message || "Erro ao carregar usuários."));
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.usuarioId || !form.descricao.trim()) {
      setSaveError("Selecione o usuário e informe a descrição da análise.");
      return;
    }
    setSaveError("");
    setSaving(true);
    try {
      const resultado = await fetchJson("/api/resultados", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          usuarioId: Number(form.usuarioId),
          descricao: form.descricao,
          laudo:     form.laudo || null,
          arquivoUrl: null,
        }),
      });

      if (arquivo) {
        const formData = new FormData();
        formData.append("file", arquivo);
        const r = await fetch(`/api/resultados/${resultado.id}/upload`, {
          method: "POST",
          headers: getAuthHeader(),
          body: formData,
        });
        if (!r.ok) {
          const body = await r.json().catch(() => ({}));
          throw new Error(body.message || `Erro ao fazer upload (${r.status})`);
        }
      }

      navigate("analises");
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar. Tente novamente.");
      setSaving(false);
    }
  };

  return (
    <div className="cadastrar-page">
      <h1 className="page-title">Cadastrar Análise</h1>

      {loadError && (
        <p style={{ color: "#c0392b", marginBottom: "16px", fontSize: "0.9rem" }}>
          {loadError}
        </p>
      )}

      <div className="form-card">
        <div className="form-section">
          <label className="form-label">Selecionar Usuário (Cliente)</label>
          <div className="select-wrap">
            <select
              className="form-select"
              value={form.usuarioId}
              onChange={(e) => set("usuarioId", e.target.value)}
              disabled={!!loadError}
            >
              <option value="">Selecionar Usuário</option>
              {usuarios.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nomePessoa ? `${u.nomePessoa} (${u.username})` : u.username}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Descrição da Análise</label>
          <div className="select-wrap">
            <input
              type="text"
              className="form-select"
              value={form.descricao}
              onChange={(e) => set("descricao", e.target.value)}
              placeholder="Ex: Análise de solo — Fazenda São João"
              disabled={!!loadError}
            />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Laudo (opcional)</label>
          <div className="select-wrap">
            <textarea
              className="form-select"
              value={form.laudo}
              onChange={(e) => set("laudo", e.target.value)}
              placeholder="Resultado detalhado da análise..."
              rows={4}
              style={{ resize: "vertical", minHeight: "80px" }}
            />
          </div>
        </div>

        <div className="form-section">
          <label className="form-label">Arquivo PDF (opcional)</label>
          <div className="select-wrap" style={{ gap: "8px" }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              style={{ display: "none" }}
              onChange={(e) => setArquivo(e.target.files[0] ?? null)}
            />
            <button
              type="button"
              className="form-select"
              style={{ textAlign: "left", cursor: "pointer", background: "var(--bg-white, #fff)" }}
              onClick={() => fileInputRef.current?.click()}
              disabled={!!loadError}
            >
              {arquivo ? arquivo.name : "Selecionar arquivo PDF..."}
            </button>
            {arquivo && (
              <button
                type="button"
                style={{ fontSize: "0.8rem", color: "#888", background: "none", border: "none", cursor: "pointer", padding: "2px 4px" }}
                onClick={() => { setArquivo(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              >
                ✕ remover
              </button>
            )}
          </div>
        </div>
      </div>

      {saveError && (
        <p style={{ color: "#c0392b", margin: "12px 0 0", fontSize: "0.9rem" }}>
          {saveError}
        </p>
      )}

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("analises")} disabled={saving}>Cancelar</button>
        <button
          className={`btn-primary ${saving ? "btn-saved" : ""}`}
          onClick={handleSave}
          disabled={saving || !!loadError}
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
