import { useState } from 'react'
import { Button, Input, PasswordInput, Stack, Text } from '@mantine/core'
import { useSession } from '../../hooks/useSession'
import { useSessionDispatch } from '../../hooks/useSessionDispatch'

export const LoginForm = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const session = useSession()
  const dispatch = useSessionDispatch()
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
      <Button onClick={() => dispatch({ type: 'login', name, password })}>
        ログイン
      </Button>
      {session.successLogIn === false && <Text>ログイン失敗</Text>}
    </Stack>
  )
}
