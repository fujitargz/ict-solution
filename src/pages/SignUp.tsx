import { useState } from 'react'
import {
  Button,
  Center,
  Input,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { useSetSession } from '../hooks/useSetSession'
import { endpoint } from '../mocks/handlers'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [session, initSession] = useSession()
  const setSession = useSetSession()
  const navigate = useNavigate()

  const handleSingUpButtonClick = () => {
    fetch(endpoint('user'), {
      body: JSON.stringify({ name, password }),
      method: 'POST',
    })
      .then((res) => {
        if (!res.ok) {
          setSession({ ...(session ?? initSession), successLogIn: false })
          throw new Error()
        }
        return res.json()
      })
      .then(({ user }) => {
        setSession({
          successLogIn: true,
          isLoggedIn: true,
          currentUser: user,
        })
        return fetch(endpoint('login'), {
          body: JSON.stringify({ name, password }),
          method: 'POST',
        })
      })
      .then((res) => {
        if (!res.ok) {
          setSession({ ...(session ?? initSession), successLogIn: false })
          throw new Error()
        }
        return res.json()
      })
      .then(({ user }) => {
        setSession({
          successLogIn: true,
          isLoggedIn: true,
          currentUser: user,
        })
        navigate('/')
      })
      .catch(() => navigate('/login'))
  }

  return (
    <Stack>
      <Center>
        <Text size="xl">新規登録</Text>
      </Center>
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <PasswordInput
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button onClick={handleSingUpButtonClick}>登録してログイン</Button>
      <Button
        variant="filled"
        color="green"
        onClick={() => {
          navigate('/login')
        }}
      >
        ログイン画面へ
      </Button>
    </Stack>
  )
}
