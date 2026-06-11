import { useState, useEffect } from "react";
import "../styles/admin.css";

function getAuthHeader() {
  const token = sessionStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function formatBRL(value) {
  if (value == null) return "R$ 0,00";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function pct(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

const STATUS_COLORS = {
  PENDENTE:   "#f59e0b",
  ACEITO:     "#3b82f6",
  REJEITADO:  "#ef4444",
  FINALIZADO: "#10b981",
};

function PieChart({ slices }) {
  let cumulative = 0;
  const r = 60;
  const cx = 70;
  const cy = 70;

  const paths = slices
    .filter((s) => s.value > 0)
    .map((s) => {
      const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
      cumulative += s.value;
      const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = s.value > 50 ? 1 : 0;
      return (
        <path
          key={s.label}
          d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
          fill={s.color}
          opacity={0.9}
        />
      );
    });

  return (
    <svg viewBox="0 0 140 140" width="140" height="140" style={{ flexShrink: 0 }}>
      {paths.length > 0 ? paths : (
        <circle cx={cx} cy={cy} r={r} fill="#e5e7eb" />
      )}
    </svg>
  );
}

function Funnel({ steps }) {
  const max = steps[0]?.value || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {steps.map((step, i) => {
        const widthPct = max > 0 ? Math.max(20, (step.value / max) * 100) : 20;
        return (
          <div key={step.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "110px", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", textAlign: "right", flexShrink: 0 }}>
              {step.label}
            </div>
            <div style={{ flex: 1, background: "#f3f4f6", borderRadius: "6px", height: "32px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${widthPct}%`,
                  height: "100%",
                  background: step.color,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                  transition: "width 0.4s ease",
                }}
              >
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                  {step.value}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AnaliseComercial() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("/api/admin/comercial/analise", { headers: getAuthHeader() })
      .then((r) => {
        if (!r.ok) throw new Error(`Erro ${r.status} ao buscar análise comercial.`);
        return r.json();
      })
      .then((res) => { setData(res); setLoading(false); })
      .catch((err) => { setError(err.message || "Erro ao carregar dados."); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="page-title">Análise Comercial</h1>
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
          Carregando indicadores...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1 className="page-title">Análise Comercial</h1>
        <div style={{ padding: "16px", background: "#fde8e8", color: "var(--red)", borderRadius: "8px", fontSize: "0.9rem" }}>
          {error}
        </div>
      </section>
    );
  }

  const {
    leadsRecebidos = 0,
    leadsPendentes = 0,
    leadsAceitos   = 0,
    leadsRejeitados = 0,
    leadsConcluidos = 0,
    taxaConversao  = 0,
    valorPotencial = 0,
    orcamentosAtrasados = 0,
    valorEmRisco   = 0,
    valorConvertido = 0,
    valorPerdido   = 0,
  } = data || {};

  const taxaRejeicao = leadsRecebidos > 0
    ? ((leadsRejeitados / leadsRecebidos) * 100).toFixed(1)
    : "0.0";

  const cardStyle = {
    background: "var(--bg-white)",
    padding: "20px 24px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
    position: "relative",
    overflow: "hidden",
  };
  const bar = (color) => ({
    height: "4px", background: color, position: "absolute", bottom: 0, left: 0, right: 0,
  });
  const label = { fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" };
  const val = (color) => ({ fontSize: "2rem", fontWeight: 700, color, margin: "6px 0 0 0" });

  const pieSlices = [
    { label: "Pendente",   value: pct(leadsPendentes,  leadsRecebidos), color: STATUS_COLORS.PENDENTE },
    { label: "Aceito",     value: pct(leadsAceitos,    leadsRecebidos), color: STATUS_COLORS.ACEITO },
    { label: "Rejeitado",  value: pct(leadsRejeitados, leadsRecebidos), color: STATUS_COLORS.REJEITADO },
    { label: "Finalizado", value: pct(leadsConcluidos, leadsRecebidos), color: STATUS_COLORS.FINALIZADO },
  ];

  const funnelSteps = [
    { label: "Total",       value: leadsRecebidos,  color: "var(--green-dark)" },
    { label: "Pendentes",   value: leadsPendentes,   color: STATUS_COLORS.PENDENTE },
    { label: "Aceitos",     value: leadsAceitos,     color: STATUS_COLORS.ACEITO },
    { label: "Finalizados", value: leadsConcluidos,  color: STATUS_COLORS.FINALIZADO },
  ];

  return (
    <section>
      <h1 className="page-title">Análise Comercial</h1>

      {/* Cards de métricas */}
      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>Métricas</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "28px" }}>

        <div style={cardStyle}>
          <span style={label}>Total de Leads</span>
          <h2 style={val("var(--green-dark)")}>{leadsRecebidos}</h2>
          <div style={bar("var(--green-mid)")} />
        </div>

        <div style={cardStyle}>
          <span style={label}>Taxa de Conversão</span>
          <h2 style={val("#10b981")}>{Number(taxaConversao).toFixed(1)}%</h2>
          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            {leadsConcluidos} finalizado{leadsConcluidos !== 1 ? "s" : ""}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 600, marginTop: "4px" }}>
            {formatBRL(valorConvertido)} convertido
          </div>
          <div style={bar("#10b981")} />
        </div>

        <div style={cardStyle}>
          <span style={label}>Taxa de Rejeição</span>
          <h2 style={val("var(--red)")}>{taxaRejeicao}%</h2>
          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            {leadsRejeitados} rejeitado{leadsRejeitados !== 1 ? "s" : ""}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--red)", fontWeight: 600, marginTop: "4px" }}>
            {formatBRL(valorPerdido)} perdido
          </div>
          <div style={bar("var(--red)")} />
        </div>

        <div style={cardStyle}>
          <span style={label}>Oportunidades (Aceito)</span>
          <h2 style={val("#3b82f6")}>{leadsAceitos}</h2>
          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            {formatBRL(valorPotencial)} potencial
          </div>
          <div style={bar("#3b82f6")} />
        </div>

        <div style={cardStyle}>
          <span style={label}>Leads Atrasados</span>
          <h2 style={val("var(--orange)")}>{orcamentosAtrasados}</h2>
          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: "2px" }}>
            {formatBRL(valorEmRisco)} em risco
          </div>
          <div style={bar("var(--orange)")} />
        </div>

      </div>

      {/* Gráfico + Funil */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>

        {/* Distribuição por status */}
        <div style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>Distribuição por Status</p>
          <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
            <PieChart slices={pieSlices} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {pieSlices.map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 500 }}>
                    {s.label}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginLeft: "auto", paddingLeft: "8px" }}>
                    {s.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funil de leads */}
        <div style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "16px" }}>Funil de Leads</p>
          <Funnel steps={funnelSteps} />
        </div>

      </div>
    </section>
  );
}
