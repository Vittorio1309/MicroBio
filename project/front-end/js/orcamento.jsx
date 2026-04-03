import React from 'react';
import '../css/orcamento.css';

const Orcamento = () => {
  return (
    <div className="container-orcamento">
      <header className="navbar">
        <div className="logo">MicroBio</div>
        <nav>
          <a href="#" className="active">Solicitação</a>
          <a href="#">Início</a>
        </nav>
      </header>

      <main className="main-content">
        <div className="card-form">
          <div className="card-header">
            <div>
              <h2>Solicitar Orçamento</h2>
              <p>Sua jornada para alta produtividade começa aqui.</p>
            </div>
            <span className="step-indicator"><strong>1</strong> / 2</span>
          </div>
          <div className="progress-bar"><div className="progress-fill"></div></div>

          <form>
            <section className="form-section">
              <h3><i className="icon-user"></i> Informações de Contato</h3>
              <div className="input-group">
                <div className="field">
                  <label>NOME COMPLETO</label>
                  <input type="text" placeholder="Ex: João da Silva" />
                </div>
                <div className="field">
                  <label>E-MAIL CORPORATIVO</label>
                  <input type="email" placeholder="joao@empresa.com.br" />
                </div>
              </div>
              <div className="field">
                <label>NOME DA EMPRESA / FAZENDA</label>
                <input type="text" placeholder="MicroBio Agropecuária Ltda" />
              </div>
            </section>

            <section className="form-section">
              <h3><i className="icon-lab"></i> Detalhes do Serviço</h3>
              <div className="field">
                <label>TIPO DE SERVIÇO</label>
                <select>
                  <option>Análise de Solo</option>
                  <option>Análise Foliar</option>
                  <option>Consultoria</option>
                </select>
              </div>
              
              <div className="input-row-green">
                <div className="field">
                  <label>TAMANHO DA ÁREA (HECTARES)</label>
                  <input type="number" placeholder="0.00" />
                </div>
                <div className="field">
                  <label>TIPO DE CULTURA</label>
                  <select>
                    <option>Soja</option>
                    <option>Milho</option>
                    <option>Algodão</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>MENSAGEM ADICIONAL (OPCIONAL)</label>
                <textarea placeholder="Descreva brevemente sua necessidade..."></textarea>
              </div>
            </section>

            <div className="form-footer">
              <button type="button" className="btn-back">Voltar</button>
              <button type="submit" className="btn-submit">
                Enviar Pedido de Orçamento <span>➤</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="footer-site">
        <div className="footer-logo">MicroBio</div>
        <div className="footer-links">
          <a href="#">Início</a>
          <a href="#">Serviços</a>
          <a href="#">Sobre</a>
          <a href="#">Laboratório</a>
        </div>
        <div className="social-icons">
          <div className="icon-circle">IG</div>
          <div className="icon-circle">IN</div>
        </div>
      </footer>
    </div>
  );
};

export default Orcamento;