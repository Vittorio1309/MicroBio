import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './src/routes'
import './src/styles/global.css'
import './src/styles/agro.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
)
