import { useState, useEffect } from "react";
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
    arquivoUrl: "",
  });
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    fetchJson("/api/admin/usuarios?role=USER", { headers: getAuthHeader() })
      .then((us) => setUsuarios(us))
      .catch((err) => setLoadError(err.message || "Erro ao carregar usuários."));
  }, []);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.usuarioId || !form.descricao.trim()) {
      setSaveError("Selecione o usuário e informe a descrição da análise.");
      return;
    }
    setSaveError("");
    setSaving(true);
    fetchJson("/api/resultados", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({
        usuarioId:  Number(form.usuarioId),
        descricao:  form.descricao,
        laudo:      form.laudo || null,
        arquivoUrl: form.arquivoUrl || null,
      }),
    })
      .then(() => navigate("analises"))
      .catch((err) => {
        setSaveError(err.message || "Erro ao salvar. Tente novamente.");
        setSaving(false);
      });
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
          <label className="form-label">URL do Arquivo (opcional)</label>
          <div className="select-wrap">
            <input
              type="text"
              className="form-select"
              value={form.arquivoUrl}
              onChange={(e) => set("arquivoUrl", e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {saveError && (
        <p style={{ color: "#c0392b", margin: "12px 0 0", fontSize: "0.9rem" }}>
          {saveError}
        </p>
      )}

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("analises")}>Cancelar</button>
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
