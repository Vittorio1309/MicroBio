import { useState, useEffect } from "react";
import "../styles/admin.css";

function getAuthHeader() {
  const token = sessionStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AnaliseComercial() {
  const activeUserRole = sessionStorage.getItem("microbio_role");
  const isMaster = activeUserRole === "ROLE_ADMIN_MASTER";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Master/Global states
  const [administradores, setAdministradores] = useState([]);
  const [selectedResponsavelId, setSelectedResponsavelId] = useState("");

  // Ranking states
  const [ranking, setRanking] = useState([]);
  const [rankingPeriodo, setRankingPeriodo] = useState("30dias");
  const [rankingLoading, setRankingLoading] = useState(false);

  const loadAnalytics = (respId) => {
    setLoading(true);
    let url = "/api/admin/comercial/analise";
    if (respId) {
      url += `?responsavelId=${respId}`;
    }
    fetch(url, { headers: getAuthHeader() })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao buscar análise comercial.");
        return r.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Erro ao carregar dados comerciais.");
        setLoading(false);
      });
  };

  const loadRanking = (periodo) => {
    if (!isMaster) return;
    setRankingLoading(true);
    fetch(`/api/admin/comercial/ranking?periodo=${periodo}`, { headers: getAuthHeader() })
      .then((r) => {
        if (!r.ok) throw new Error("Erro ao buscar ranking.");
        return r.json();
      })
      .then((res) => {
        setRanking(res || []);
        setRankingLoading(false);
      })
      .catch(() => {
        setRankingLoading(false);
      });
  };

  useEffect(() => {
    loadAnalytics(selectedResponsavelId);
  }, [selectedResponsavelId]);

  useEffect(() => {
    loadRanking(rankingPeriodo);
  }, [rankingPeriodo]);

  useEffect(() => {
    if (isMaster) {
      fetch("/api/admin/usuarios/administradores", { headers: getAuthHeader() })
        .then((r) => (r.ok ? r.json() : []))
        .then((res) => setAdministradores(res || []))
        .catch(() => {});
    }
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="page-title">
          {isMaster ? "Análise Comercial Global" : "Minha Análise Comercial"}
        </h1>
        <div style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
          Carregando indicadores comerciais...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h1 className="page-title">
          {isMaster ? "Análise Comercial Global" : "Minha Análise Comercial"}
        </h1>
        <div style={{ padding: "16px", background: "#fde8e8", color: "var(--red)", borderRadius: "8px" }}>
          ⚠️ {error}
        </div>
      </section>
    );
  }

  const {
    leadsRecebidos = 0,
    leadsConvertidos = 0,
    leadsPerdidos = 0,
    taxaConversao = 0,
    tempoMedioConversaoHoras = 0,
    orcamentosAtrasados = 0,
  } = data || {};

  const leadsEmAberto = Math.max(0, leadsRecebidos - leadsConvertidos - leadsPerdidos);
  const orcamentosNoPrazo = Math.max(0, leadsEmAberto - orcamentosAtrasados);

  // Formatar tempo médio
  const formatTempoMedio = (horas) => {
    if (horas === 0) return "—";
    if (horas < 24) return `${horas.toFixed(1)}h`;
    const dias = horas / 24;
    return `${dias.toFixed(1)} dias`;
  };

  // Porcentagens para gráficos
  const pctConvertidos = leadsRecebidos > 0 ? (leadsConvertidos / leadsRecebidos) * 100 : 0;
  const pctPerdidos = leadsRecebidos > 0 ? (leadsPerdidos / leadsRecebidos) * 100 : 0;
  const pctAberto = leadsRecebidos > 0 ? (leadsEmAberto / leadsRecebidos) * 100 : 0;

  // Parâmetros do gráfico de Rosca (Donut Chart) SVG
  // Circunferência de raio 40 é 2 * PI * 40 = 251.3
  const c = 251.3;
  const strokeConvertidos = (pctConvertidos / 100) * c;
  const strokePerdidos = (pctPerdidos / 100) * c;
  const strokeAberto = (pctAberto / 100) * c;

  const offsetConvertidos = 0;
  const offsetPerdidos = strokeConvertidos;
  const offsetAberto = strokeConvertidos + strokePerdidos;

  return (
    <section>
      {/* Header com Filtros se Master */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
        <h1 className="page-title" style={{ margin: 0, borderBottom: "none", paddingBottom: 0 }}>
          {isMaster ? "Análise Comercial Global" : "Minha Análise Comercial"}
        </h1>
        {isMaster && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-secondary)" }}>Filtrar por Responsável:</span>
            <select
              className="filter-select"
              style={{ minWidth: "200px", height: "38px", padding: "0 10px" }}
              value={selectedResponsavelId}
              onChange={(e) => setSelectedResponsavelId(e.target.value)}
            >
              <option value="">Todos os Responsáveis</option>
              {administradores.map((adm) => (
                <option key={adm.id} value={adm.id}>
                  {adm.nomePessoa ? `${adm.nomePessoa} (${adm.username})` : adm.username}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Cards de Indicadores */}
      <div className="metrics-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
        
        <div className="metric-card" style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            {isMaster ? "Leads Recebidos" : "Meus Leads Recebidos"}
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--green-dark)", margin: "8px 0 0 0" }}>{leadsRecebidos}</h2>
          <div style={{ height: "4px", background: "var(--green-mid)", position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </div>

        <div className="metric-card" style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            {isMaster ? "Leads Convertidos" : "Meus Leads Convertidos"}
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#10b981", margin: "8px 0 0 0" }}>{leadsConvertidos}</h2>
          <div style={{ height: "4px", background: "#10b981", position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </div>

        <div className="metric-card" style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            {isMaster ? "Leads Perdidos" : "Meus Leads Perdidos"}
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--red)", margin: "8px 0 0 0" }}>{leadsPerdidos}</h2>
          <div style={{ height: "4px", background: "var(--red)", position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </div>

        <div className="metric-card" style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            {isMaster ? "Taxa de Conversão" : "Minha Taxa de Conversão"}
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--green-main)", margin: "8px 0 0 0" }}>{taxaConversao.toFixed(1)}%</h2>
          <div style={{ height: "4px", background: "var(--green-main)", position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </div>

        <div className="metric-card" style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            {isMaster ? "Tempo Médio de Conversão" : "Meu Tempo Médio"}
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "#4f46e5", margin: "8px 0 0 0" }}>{formatTempoMedio(tempoMedioConversaoHoras)}</h2>
          <div style={{ height: "4px", background: "#4f46e5", position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </div>

        <div className="metric-card" style={{ background: "var(--bg-white)", padding: "24px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", position: "relative", overflow: "hidden" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            {isMaster ? "Orçamentos em Atraso" : "Meus Orçamentos em Atraso"}
          </span>
          <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--orange)", margin: "8px 0 0 0" }}>{orcamentosAtrasados}</h2>
          <div style={{ height: "4px", background: "var(--orange)", position: "absolute", bottom: 0, left: 0, right: 0 }} />
        </div>

      </div>

      {/* Gráficos em Linha/Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
        
        {/* Gráfico 1: Funil de Conversão */}
        <div style={{ background: "var(--bg-white)", padding: "28px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>Funil de Conversão Comercial</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Etapa 1 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
                <span style={{ fontWeight: 600 }}>1. Leads Recebidos (Total)</span>
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{leadsRecebidos} ({leadsRecebidos > 0 ? "100%" : "0%"})</span>
              </div>
              <div style={{ height: "28px", background: "var(--green-light)", borderRadius: "6px", overflow: "hidden", display: "flex", alignItems: "center", padding: "0 10px" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--green-dark)", zIndex: 1 }}>Entrada de Contatos</span>
              </div>
            </div>

            {/* Etapa 2 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
                <span style={{ fontWeight: 600 }}>2. Leads em Negociação / Abertos</span>
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{leadsEmAberto} ({leadsRecebidos > 0 ? ((leadsEmAberto / leadsRecebidos) * 100).toFixed(0) : 0}%)</span>
              </div>
              <div style={{ height: "28px", background: "#eff6ff", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", width: `${leadsRecebidos > 0 ? (leadsEmAberto / leadsRecebidos) * 100 : 0}%`, background: "#3b82f6", borderRadius: "6px" }} />
                <span style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", fontSize: "0.78rem", fontWeight: 600, color: "#1e3a8a" }}>Kanban Ativo</span>
              </div>
            </div>

            {/* Etapa 3 */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "6px" }}>
                <span style={{ fontWeight: 600 }}>3. Leads Convertidos (Clientes)</span>
                <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{leadsConvertidos} ({taxaConversao.toFixed(0)}%)</span>
              </div>
              <div style={{ height: "28px", background: "#ecfdf5", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                <div style={{ height: "100%", width: `${pctConvertidos}%`, background: "#10b981", borderRadius: "6px" }} />
                <span style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", fontSize: "0.78rem", fontWeight: 600, color: "#064e3b" }}>Conversões Concluídas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico 2: Distribuição de Leads */}
        <div style={{ background: "var(--bg-white)", padding: "28px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "20px" }}>Resultado Comercial dos Leads</h3>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "32px", flex: 1, flexWrap: "wrap" }}>
            {leadsRecebidos === 0 ? (
              <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.88rem" }}>Sem dados para exibir</p>
            ) : (
              <>
                <svg width="150" height="150" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                  
                  {/* Convertidos (Verde) */}
                  {strokeConvertidos > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12"
                      strokeDasharray={`${strokeConvertidos} ${c}`}
                      strokeDashoffset={-offsetConvertidos}
                      transform="rotate(-90 50 50)"
                    />
                  )}
                  
                  {/* Perdidos (Vermelho) */}
                  {strokePerdidos > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#dc2626" strokeWidth="12"
                      strokeDasharray={`${strokePerdidos} ${c}`}
                      strokeDashoffset={-offsetPerdidos}
                      transform="rotate(-90 50 50)"
                    />
                  )}

                  {/* Em Aberto (Azul) */}
                  {strokeAberto > 0 && (
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12"
                      strokeDasharray={`${strokeAberto} ${c}`}
                      strokeDashoffset={-offsetAberto}
                      transform="rotate(-90 50 50)"
                    />
                  )}
                  
                  <text x="50" y="55" textAnchor="middle" style={{ fontSize: "9px", fontWeight: 700, fill: "var(--text-primary)" }}>
                    {taxaConversao.toFixed(0)}%
                  </text>
                  <text x="50" y="65" textAnchor="middle" style={{ fontSize: "5px", fill: "var(--text-secondary)" }}>
                    Conversão
                  </text>
                </svg>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981" }} />
                    <span>Convertidos: <strong>{leadsConvertidos}</strong> ({pctConvertidos.toFixed(0)}%)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#dc2626" }} />
                    <span>Perdidos: <strong>{leadsPerdidos}</strong> ({pctPerdidos.toFixed(0)}%)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.82rem" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#3b82f6" }} />
                    <span>Em aberto: <strong>{leadsEmAberto}</strong> ({pctAberto.toFixed(0)}%)</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Gráfico 3: Cumprimento do Prazo de Atendimento */}
        <div style={{ background: "var(--bg-white)", padding: "28px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "16px" }}>Prazo de Acompanhamento (Leads em Aberto)</h3>
          
          {leadsEmAberto === 0 ? (
            <p style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: "0.88rem", padding: "16px 0" }}>Nenhum lead em aberto no momento</p>
          ) : (
            <div>
              <div style={{ display: "flex", gap: "8px", height: "30px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
                {orcamentosNoPrazo > 0 && (
                  <div style={{
                    background: "var(--green-mid)",
                    width: `${(orcamentosNoPrazo / leadsEmAberto) * 100}%`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}>
                    No prazo: {orcamentosNoPrazo} ({((orcamentosNoPrazo / leadsEmAberto) * 100).toFixed(0)}%)
                  </div>
                )}
                {orcamentosAtrasados > 0 && (
                  <div style={{
                    background: "var(--orange)",
                    width: `${(orcamentosAtrasados / leadsEmAberto) * 100}%`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600
                  }}>
                    Atrasados: {orcamentosAtrasados} ({((orcamentosAtrasados / leadsEmAberto) * 100).toFixed(0)}%)
                  </div>
                )}
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                Atualmente, <strong>{((orcamentosNoPrazo / leadsEmAberto) * 100).toFixed(0)}%</strong> dos leads ativos estão dentro do tempo máximo configurado para atendimento.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Ranking de Conversão por Responsável se Master */}
      {isMaster && (
        <div style={{ background: "var(--bg-white)", padding: "28px", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "var(--shadow)", marginTop: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>🏆 Ranking de Conversões por Responsável</h3>
            <select
              className="filter-select"
              style={{ minWidth: "150px", height: "34px", padding: "0 8px" }}
              value={rankingPeriodo}
              onChange={(e) => setRankingPeriodo(e.target.value)}
            >
              <option value="hoje">Hoje</option>
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
            </select>
          </div>

          {rankingLoading ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Carregando ranking...</p>
          ) : ranking.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontStyle: "italic" }}>Nenhum dado de conversão disponível para este período.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {ranking.map((item, index) => {
                const isTop = index < 3;
                return (
                  <div
                    key={item.nome}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      background: isTop ? "#ecfdf5" : "var(--bg-main)",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: isTop ? "#10b981" : "#e5e7eb",
                        color: isTop ? "#fff" : "#4b5563",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "0.82rem"
                      }}>
                        {index + 1}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>{item.nome}</span>
                    </div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--green-dark)" }}>
                      {item.conversoes} conversão{item.conversoes !== 1 ? "ões" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
