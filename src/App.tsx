import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { UsersContextProvider } from './contexts/users'
import { Frame } from './components/Frame'
import { useUsers } from './hooks/useUsers'

function App() {
  const users = useUsers()
  return (
    <MantineProvider>
      <UsersContextProvider>
        <Frame>
          {users.map(({ id, name }) => (
            <div key={id}>{name}</div>
          ))}
        </Frame>
      </UsersContextProvider>
    </MantineProvider>
  )
}

export default App
