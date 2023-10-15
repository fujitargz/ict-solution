import { MantineProvider } from '@mantine/core'
import { Button } from '@mantine/core'
import '@mantine/core/styles.css'

function App() {
  return (
    <MantineProvider>
      <h1 className="text-blue-700">TailwindCSS!</h1>
      <Button variant="filled">Mantine</Button>
    </MantineProvider>
  )
}

export default App
