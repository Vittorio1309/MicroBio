import { useState } from "react";
import "../styles/Clientes.css";

const initialClientes = [
  { id: 1, nome: "João Silva",    cpf: "123.456.789-00", email: "joao@email.com" },
  { id: 2, nome: "Ana Souza",     cpf: "987.654.221-00", email: "ana@email.com" },
  { id: 3, nome: "Carlos Lima",   cpf: "456.123.987-00", email: "carlos@email.com" },
  { id: 4, nome: "Fernanda Melo", cpf: "321.654.987-00", email: "fernanda@email.com" },
];

export default function Clientes() {
  const [clientes, setClientes] = useState(initialClientes);
  const [search, setSearch]     = useState("");
  const [modal, setModal]       = useState(null); // null | {mode:'novo'} | {mode:'editar', cliente}
  const [form, setForm]         = useState({ nome: "", cpf: "", email: "" });

  const filtered = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const openNovo = () => {
    setForm({ nome: "", cpf: "", email: "" });
    setModal({ mode: "novo" });
  };

  const openEditar = (c) => {
    setForm({ nome: c.nome, cpf: c.cpf, email: c.email });
    setModal({ mode: "editar", id: c.id });
  };

  const handleSave = () => {
    if (!form.nome || !form.email) return;
    if (modal.mode === "novo") {
      setClientes((prev) => [...prev, { id: Date.now(), ...form }]);
    } else {
      setClientes((prev) =>
        prev.map((c) => (c.id === modal.id ? { ...c, ...form } : c))
      );
    }
    setModal(null);
  };

  return (
    <div className="clientes-page">
      <h1 className="page-title">Gerenciamento de Clientes</h1>

      <div className="clientes-topbar">
        <input
          type="text"
          className="clientes-search"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={openNovo}>
          Novo Cliente ∨
        </button>
      </div>

      <div className="clientes-list">
        {filtered.length === 0 && (
          <p className="clientes-empty">Nenhum cliente encontrado.</p>
        )}
        {filtered.map((c) => (
          <div key={c.id} className="cliente-row">
            <span className="cliente-nome">{c.nome}</span>
            <span className="cliente-cpf">{c.cpf}</span>
            <span className="cliente-email">{c.email}</span>
            <button className="btn-primary btn-sm" onClick={() => openEditar(c)}>Editar</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {modal.mode === "novo" ? "Novo Cliente" : "Editar Cliente"}
            </h2>
            <div className="modal-fields">
              <div className="modal-field">
                <label className="form-label">Nome</label>
                <input
                  className="modal-input"
                  placeholder="Nome completo"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">CPF</label>
                <input
                  className="modal-input"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={(e) => setForm((f) => ({ ...f, cpf: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="form-label">E-mail</label>
                <input
                  className="modal-input"
                  type="email"
                  placeholder="email@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSave}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
