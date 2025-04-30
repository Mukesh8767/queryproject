import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Auth0Provider
    domain="dev-utu64o56c045t2z6.us.auth0.com"
    clientId="nD23hzAhW1WzKghVYq50XYoTZTLbEJha"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </StrictMode>,
)
