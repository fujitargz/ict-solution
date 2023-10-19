import { useState } from 'react'
import { Button, Input, PasswordInput, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { useSessionDispatch } from '../hooks/useSessionDispatch'
import { useUsersDispatch } from '../hooks/useUsersDispatch'

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const session = useSession()
  const sessionDispatch = useSessionDispatch()
  const userDispatch = useUsersDispatch()
  const navigate = useNavigate()
  return (
    <Stack>
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
        onClick={() => {
          userDispatch({ type: 'create', name, password })
          sessionDispatch({ type: 'login', name, password })
          navigate('/')
        }}
      >
        新規登録
      </Button>
      {session.successLogIn === false && <Text>ログイン失敗</Text>}
    </Stack>
  )
}
