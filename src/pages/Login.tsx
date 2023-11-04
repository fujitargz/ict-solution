import { useEffect, useState } from 'react'
import {
  Affix,
  Button,
  Center,
  Input,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core'
import { useNavigate, Navigate } from 'react-router-dom'
import { useSession, checkSessionManually } from '../hooks/useSession'
import { useSetSession } from '../hooks/useSetSession'
import { endpoint } from '../mocks/handlers'
import { seed } from '../mocks/seed'

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [session, initSession] = useSession()
  const setSession = useSetSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (session === undefined) {
      setSession(initSession)
    }
  }, [session, initSession, setSession])

  if (!session?.isLoggedIn) {
    const checkedSession = checkSessionManually()
    if (checkedSession.isLoggedIn) {
      return <Navigate to="/" />
    }
  }

  const handleLoginButtonClick = () =>
    fetch(endpoint('login'), {
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
      .then(({ user }) =>
        setSession({
          successLogIn: true,
          isLoggedIn: true,
          currentUser: user,
        }),
      )
      .then(() => navigate('/'))
      .catch(() => {})

  return (
    <>
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
        <Button onClick={handleLoginButtonClick}>ログイン</Button>
        <Button
          variant="filled"
          color="green"
          onClick={() => {
            navigate('/signup')
          }}
        >
          新規登録画面へ
        </Button>
        {(session as NonNullable<typeof session>).successLogIn === false && (
          <Text>ログイン失敗</Text>
        )}
      </Stack>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Button onClick={seed}>初期化</Button>
      </Affix>
    </>
  )
}
