import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router'
import { SessionContextProvider } from './contexts/session'
import { Frame } from './components/Frame'

function App() {
  return (
    <MantineProvider>
      <SessionContextProvider>
        <Frame>
          <RouterProvider router={Router} />
        </Frame>
      </SessionContextProvider>
    </MantineProvider>
  )
}

export default App
