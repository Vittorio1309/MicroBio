import { useState, useEffect } from "react";
import "../styles/Clientes.css";

const API_BASE = "/api/admin/usuarios";

function getAuthHeader() {
  const token = localStorage.getItem("microbio_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_BASE, {
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
      });
      if (!res.ok) throw new Error(`Erro ao carregar usuários (${res.status})`);
      const data = await res.json();
      setUsuarios(data);
    } catch (err) {
      setError(err.message || "Erro ao carregar usuários.");
    } finally {
      setLoading(false);
    }
  }

  const filtered = usuarios.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  const openNovo = () => {
    setForm({ username: "", password: "", role: "USER" });
    setSaveError("");
    setModal({ mode: "novo" });
  };

  const handleSave = async () => {
    if (!form.username || !form.password) {
      setSaveError("Username e senha são obrigatórios.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          role: form.role,
          pessoaId: null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Erro ao criar usuário (${res.status})`);
      }
      setModal(null);
      await fetchUsuarios();
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar usuário.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="clientes-page">
      <h1 className="page-title">Gerenciamento de Usuários</h1>

      <div className="clientes-topbar">
        <input
          type="text"
          className="clientes-search"
          placeholder="Buscar por username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={openNovo}>
          Novo Usuário ∨
        </button>
      </div>

      {loading && <p className="clientes-empty">Carregando usuários...</p>}
      {error && <p className="clientes-empty" style={{ color: "#c0392b" }}>{error}</p>}

      {!loading && !error && (
        <div className="clientes-list">
          {filtered.length === 0 && (
            <p className="clientes-empty">Nenhum usuário encontrado.</p>
          )}
          {filtered.map((u) => (
            <div key={u.id} className="cliente-row">
              <span className="cliente-nome">{u.username}</span>
              <span className="cliente-cpf">{u.role}</span>
              <span className="cliente-email">
                {u.pessoaId ? `Pessoa #${u.pessoaId}` : "Sem vínculo"}
              </span>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Novo Usuário</h2>
            <div className="modal-fields">
              <div className="modal-field">
                <label className="form-label">Username</label>
                <input
                  className="modal-input"
                  placeholder="nome de login"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Senha</label>
                <input
                  className="modal-input"
                  type="password"
                  placeholder="Senha"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">Role</label>
                <select
                  className="modal-input"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                >
                  <option value="USER">ROLE_USER</option>
                  <option value="ADMIN">ROLE_ADMIN</option>
                </select>
              </div>
            </div>
            {saveError && (
              <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: "8px 0 0" }}>
                {saveError}
              </p>
            )}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
