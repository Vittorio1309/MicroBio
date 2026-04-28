import React from 'react';
import ReactDOM from 'react-dom/client';
import Orcamento from './orcamento.jsx';
import '../css/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Aqui nós mandamos o React renderizar apenas a sua tela de orçamento */}
    <Orcamento />
  </React.StrictMode>
);
