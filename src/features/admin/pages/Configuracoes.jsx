import { useState, useEffect } from "react";
import "../styles/admin.css";

function getAuthHeader() {
  const token = sessionStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function Configuracoes() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [numero, setNumero] = useState("");
  const [unidade, setUnidade] = useState("horas");

  useEffect(() => {
    fetch("/api/admin/configuracoes/prazo_acompanhamento_orcamentos", {
      headers: getAuthHeader(),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao buscar configuração");
        return r.json();
      })
      .then((data) => {
        const val = (data && data.valor) ? data.valor : "48 horas";
        const parts = val.trim().split(/\s+/);
        const num = parseInt(parts[0], 10) || 48;
        const unit = parts[1] || "horas";
        setNumero(String(num));
        setUnidade(unit);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Não foi possível carregar as configurações.");
        setLoading(false);
      });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    const numValue = Math.max(1, parseInt(numero, 10) || 1);
    const valor = `${numValue} ${unidade}`;

    try {
      const r = await fetch("/api/admin/configuracoes/prazo_acompanhamento_orcamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ valor }),
      });

      if (!r.ok) {
        throw new Error("Falha ao salvar configuração.");
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err.message || "Ocorreu um erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section>
        <h1 className="page-title">Configurações gerais</h1>
        <div className="form-card" style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)" }}>Carregando configurações...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Configurações do Sistema</h1>

      <div style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSave} className="form-card" style={{ background: "var(--bg-white)", padding: "32px", borderRadius: "12px", boxShadow: "var(--shadow)" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--green-dark)", marginBottom: "8px" }}>
            ⏱️ Prazo de Acompanhamento Comercial
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.5" }}>
            Defina o tempo limite máximo que um orçamento (Lead) pode permanecer sem movimentação no Kanban antes de ser sinalizado visualmente como atrasado.
          </p>

          {error && (
            <div style={{ padding: "12px", background: "#fde8e8", color: "var(--red)", borderRadius: "8px", fontSize: "0.88rem", marginBottom: "16px" }}>
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div style={{ padding: "12px", background: "var(--green-light)", color: "var(--green-dark)", borderRadius: "8px", fontSize: "0.88rem", marginBottom: "16px", fontWeight: "500" }}>
              ✓ Configuração salva com sucesso!
            </div>
          )}

          <div style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
            <div style={{ flex: 1 }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: "0.82rem", display: "block", marginBottom: "6px" }}>Tempo Limite</label>
              <input
                type="number"
                min="1"
                required
                className="filter-select"
                style={{ width: "100%", height: "42px", padding: "8px 12px" }}
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label className="form-label" style={{ fontWeight: 600, fontSize: "0.82rem", display: "block", marginBottom: "6px" }}>Unidade de Medida</label>
              <select
                className="filter-select"
                style={{ width: "100%", height: "42px", padding: "8px 12px" }}
                value={unidade}
                onChange={(e) => setUnidade(e.target.value)}
              >
                <option value="horas">Horas</option>
                <option value="dias">Dias</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
              style={{ padding: "12px 24px", minWidth: "150px", justifyContent: "center" }}
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
