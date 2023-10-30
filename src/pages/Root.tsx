import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Space, Stack, Text } from '@mantine/core'
import { useSession, checkSessionManually } from '../hooks/useSession'
import { useSetSession, setSessionManually } from '../hooks/useSetSession'

export const Root = () => {
  const [session] = useSession()
  const setSession = useSetSession()
  const navigate = useNavigate()

  if (!session?.isLoggedIn) {
    const checkedSession = checkSessionManually()
    if (checkedSession.isLoggedIn) {
      setSessionManually(checkedSession)
      return <></>
    } else {
      return <Navigate to="/login" />
    }
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
        onClick={() =>
          setSession({
            successLogIn: 'yet',
            isLoggedIn: false,
          })
        }
      >
        ログアウト
      </Button>
    </Stack>
  )
}
