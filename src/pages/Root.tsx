import { Navigate } from 'react-router-dom'
import { Button, Stack, Text } from '@mantine/core'
import { useSession } from '../hooks/useSession'
import { useSessionDispatch } from '../hooks/useSessionDispatch'

export const Root = () => {
  const session = useSession()
  const dispatch = useSessionDispatch()
  if (!session.isLoggedIn) {
    return <Navigate to="/login" />
  }
  return (
    <Stack>
      <Text>ログイン中のユーザ：{session.currentUser.name}</Text>
      <Button onClick={() => dispatch({ type: 'logout' })}>ログアウト</Button>
    </Stack>
  )
}
