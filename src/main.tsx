import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { worker } from './mocks/browser.ts'

worker
  .start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { options: { scope: '/ict-solution' } },
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  })
