import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { worker } from './mocks/browser.ts'
import packageJson from '../package.json'
import { StartOptions } from 'msw/browser'

const mswConfig: StartOptions =
  process.env.NODE_ENV === 'development'
    ? {
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          options: { scope: '/ict-solution' },
        },
      }
    : {
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          options: { scope: '/ict-solution' },
          url: `${packageJson.homepage}/mockServiceWorker.js`,
        },
      }

worker.start(mswConfig).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
