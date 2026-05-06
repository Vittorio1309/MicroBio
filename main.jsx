import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRoutes } from './microbio-project/frontend/src/routes'
import './microbio-project/frontend/src/styles/global.css'
import './microbio-project/frontend/src/styles/agro.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
)
