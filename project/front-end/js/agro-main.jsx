import React from 'react';
import ReactDOM from 'react-dom/client';
import { Nav, Section } from './agro.jsx';
import '../css/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <Section />
  </React.StrictMode>
);
