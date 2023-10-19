import { useState } from 'react'
import { Button, Input, PasswordInput, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { useSessionDispatch } from '../hooks/useSessionDispatch'

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const session = useSession()
  const dispatch = useSessionDispatch()
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
          dispatch({ type: 'login', name, password })
          navigate('/')
        }}
      >
        ログイン
      </Button>
      {session.successLogIn === false && <Text>ログイン失敗</Text>}
    </Stack>
  )
}
