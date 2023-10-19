import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { RouterProvider } from 'react-router-dom'
import { Router } from './Router'
import { UsersContextProvider } from './contexts/users'
import { SessionContextProvider } from './contexts/session'
import { Frame } from './components/Frame'

function App() {
  return (
    <MantineProvider>
      <UsersContextProvider>
        <SessionContextProvider>
          <Frame>
            <RouterProvider router={Router} />
          </Frame>
        </SessionContextProvider>
      </UsersContextProvider>
    </MantineProvider>
  )
}

export default App
