import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Space, Stack, Text } from '@mantine/core'
import { useSession } from '../hooks/useSession'
import { useSessionDispatch } from '../hooks/useSessionDispatch'

export const Root = () => {
  const session = useSession()
  const dispatch = useSessionDispatch()
  const navigate = useNavigate()

  if (!session.isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <Stack>
      <Button variant="filled" onClick={() => navigate('/rentfrom')}>
        モバイルバッテリーを借りる
      </Button>
      <Button
        variant="filled"
        color="green"
        onClick={() => navigate('/rentto')}
      >
        モバイルバッテリーを貸す
      </Button>
      <Space />
      <Text>ログイン中のユーザ：{session.currentUser.name}</Text>
      <Button
        variant="filled"
        color="red"
        onClick={() => dispatch({ type: 'logout' })}
      >
        ログアウト
      </Button>
    </Stack>
  )
}
