import { useState, useEffect } from "react";
import "../styles/Clientes.css";

const API_BASE = "/api/admin/usuarios";

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

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchJson(API_BASE, { headers: { "Content-Type": "application/json", ...getAuthHeader() } });
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
    setShowPassword(false);
    setSaveError("");
    setConfirmDelete(false);
    setModal({ mode: "novo" });
  };

  const openEditar = (u) => {
    setForm({ username: u.username, password: "", role: u.role });
    setShowPassword(false);
    setSaveError("");
    setConfirmDelete(false);
    setModal({ mode: "editar", id: u.id });
  };

  const closeModal = () => {
    setModal(null);
    setConfirmDelete(false);
    setSaveError("");
  };

  const handleSave = async () => {
    if (modal.mode === "novo") {
      if (!form.username || !form.password) {
        setSaveError("Username e senha são obrigatórios.");
        return;
      }
    } else {
      if (!form.username) {
        setSaveError("Username é obrigatório.");
        return;
      }
    }

    setSaving(true);
    setSaveError("");
    try {
      if (modal.mode === "novo") {
        await fetchJson(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify({ username: form.username, password: form.password, role: form.role, pessoaId: null }),
        });
      } else {
        const body = { username: form.username };
        if (form.password) body.password = form.password;
        await fetchJson(`${API_BASE}/${modal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          body: JSON.stringify(body),
        });
      }
      closeModal();
      await fetchUsuarios();
    } catch (err) {
      setSaveError(err.message || "Erro ao salvar usuário.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setSaveError("");
    try {
      await fetchJson(`${API_BASE}/${modal.id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
      });
      closeModal();
      await fetchUsuarios();
    } catch (err) {
      setSaveError(err.message || "Erro ao excluir usuário.");
      setConfirmDelete(false);
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
          Novo Usuário
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
              <button className="btn-primary btn-sm" onClick={() => openEditar(u)}>Editar</button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modal.mode === "novo" ? "Novo Usuário" : "Editar Usuário"}
            </h2>
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
                <label className="form-label">
                  {modal.mode === "novo" ? "Senha" : "Nova Senha (deixe em branco para não alterar)"}
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="modal-input"
                    type={showPassword ? "text" : "password"}
                    placeholder={modal.mode === "novo" ? "Senha" : "••••••••"}
                    value={form.password}
                    style={{ paddingRight: "40px" }}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="#717a6d" strokeWidth="2" width="16" height="16">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {modal.mode === "novo" && (
                <div className="modal-field">
                  <label className="form-label">Tipo de acesso</label>
                  <select
                    className="modal-input"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  >
                    <option value="USER">Usuário</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              )}
            </div>

            {saveError && (
              <p style={{ color: "#c0392b", fontSize: "0.85rem", margin: "0 0 12px" }}>
                {saveError}
              </p>
            )}

            {modal.mode === "editar" && confirmDelete && (
              <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", fontSize: "0.88rem", color: "#856404" }}>
                Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
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
