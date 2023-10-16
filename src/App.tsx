import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { UsersContextProvider } from './contexts/users'
import { SessionContextProvider } from './contexts/session'
import { Frame } from './components/Frame'
import { Router } from './components/Router'

function App() {
  return (
    <MantineProvider>
      <UsersContextProvider>
        <SessionContextProvider>
          <Frame>
            <Router />
          </Frame>
        </SessionContextProvider>
      </UsersContextProvider>
    </MantineProvider>
  )
}

export default App
