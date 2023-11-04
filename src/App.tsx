import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router'
import { SessionContextProvider } from './contexts/session'

function App() {
  return (
    <MantineProvider>
      <SessionContextProvider>
        <RouterProvider router={Router} />
      </SessionContextProvider>
    </MantineProvider>
  )
}

export default App
