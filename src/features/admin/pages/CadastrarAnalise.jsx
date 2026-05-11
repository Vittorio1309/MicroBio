import { useState } from "react";
import "../styles/CadastrarAnalise.css";

const clientes = ["João Silva", "Ana Souza", "Carlos Lima", "Fernanda Melo"];
const tipos    = ["Água", "Solo", "Alimentos", "Ar", "Biológico"];

export default function CadastrarAnalise({ navigate }) {
  const [form, setForm] = useState({
    cliente: "",
    tipo1: "",
    tipo2: "",
    status: "Todos",
    arquivo: null,
  });
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) set("arquivo", file.name);
  };

  const handleSave = () => {
    if (!form.cliente || !form.tipo1) {
      alert("Selecione o cliente e pelo menos um tipo de análise.");
      return;
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); navigate("analises"); }, 1200);
  };

  return (
    <div className="cadastrar-page">
      <h1 className="page-title">Cadastrar Análise</h1>

      <div className="form-card">
        {/* Cliente */}
        <div className="form-section">
          <label className="form-label">Selecionar Cliente</label>
          <div className="select-wrap">
            <select
              className="form-select"
              value={form.cliente}
              onChange={(e) => set("cliente", e.target.value)}
            >
              <option value="">Selecionar Cliente</option>
              {clientes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Tipos */}
        <div className="form-row">
          <div className="form-section">
            <label className="form-label">Tipo de Análise</label>
            <div className="select-wrap">
              <select
                className="form-select"
                value={form.tipo1}
                onChange={(e) => set("tipo1", e.target.value)}
              >
                <option value="">Selecionar Tipo</option>
                {tipos.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-section">
            <label className="form-label">Tipo de Análise</label>
            <div className="select-wrap">
              <select
                className="form-select"
                value={form.tipo2}
                onChange={(e) => set("tipo2", e.target.value)}
              >
                <option value="">Selecionar Tipo</option>
                {tipos.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="form-section">
          <label className="form-label">Enviar PDF do Resultado</label>
          <label className="upload-btn">
            <input type="file" accept=".pdf" style={{ display: "none" }} onChange={handleFile} />
            {form.arquivo ? `📄 ${form.arquivo}` : "Upload Arquivo"}
          </label>
        </div>

        {/* Status */}
        <div className="form-section">
          <label className="form-label">Selecionar Status</label>
          <div className="select-wrap">
            <select
              className="form-select"
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option>Todos</option>
              <option>Pendente</option>
              <option>Concluido</option>
              <option>Em atraso</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-secondary" onClick={() => navigate("analises")}>Cancelar</button>
        <button className={`btn-primary ${saved ? "btn-saved" : ""}`} onClick={handleSave}>
          {saved ? "✓ Salvo!" : "Salvar"}
        </button>
      </div>
    </div>
  );
}
