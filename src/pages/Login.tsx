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
import { useSessionDispatch } from '../hooks/useSessionDispatch'

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const session = useSession()
  const sessionDispatch = useSessionDispatch()
  const navigate = useNavigate()
  return (
    <Stack>
      <Center>
        <Text size="xl">ログイン</Text>
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
          sessionDispatch({ type: 'login', name, password })
          navigate('/')
        }}
      >
        ログイン
      </Button>
      <Button
        variant="filled"
        color="green"
        onClick={() => {
          navigate('/signup')
        }}
      >
        新規登録画面へ
      </Button>
      {session.successLogIn === false && <Text>ログイン失敗</Text>}
    </Stack>
  )
}
