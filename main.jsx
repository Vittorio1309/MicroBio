import React from 'react'
import ReactDOM from 'react-dom/client'
import { Body } from './project/front-end/js/choose.jsx' // Verifique se este caminho está certo!
import './project/front-end/css/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Body />
  </React.StrictMode>
)