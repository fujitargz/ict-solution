import { Button, Stack, Text } from '@mantine/core'
import { useSession } from '../../hooks/useSession'
import { LoginForm } from '../LoginForm'
import { useSessionDispatch } from '../../hooks/useSessionDispatch'

export const Router = () => {
  const session = useSession()
  const dispatch = useSessionDispatch()
  return session.isLoggedIn ? (
    <Stack>
      <Text>ログイン中のユーザ：{session.currentUser.name}</Text>
      <Button onClick={() => dispatch({ type: 'logout' })}>ログアウト</Button>
    </Stack>
  ) : (
    <LoginForm />
  )
}
