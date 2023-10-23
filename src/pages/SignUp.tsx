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
import { useSessionDispatch } from '../hooks/useSessionDispatch'
import { useUsersDispatch } from '../hooks/useUsersDispatch'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const sessionDispatch = useSessionDispatch()
  const userDispatch = useUsersDispatch()
  const navigate = useNavigate()
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
      <Button
        onClick={() => {
          userDispatch({ type: 'create', name, password })
          sessionDispatch({ type: 'login', name, password })
          navigate('/')
        }}
      >
        登録してログイン
      </Button>
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
