import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Importamos el router
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx' // 1. Importamos el proveedor del carrito

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <CartProvider> {/* 2. Envolvemos a App con el carrito */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)