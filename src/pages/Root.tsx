import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Space, Stack, Text } from '@mantine/core'
import { useSession, checkSessionManually } from '../hooks/useSession'
import { useSetSession, setSessionManually } from '../hooks/useSetSession'
import { useState } from 'react'
import { endpoint, Battery, Rental } from '../mocks/handlers'

export const Root = () => {
  const [status, setStatus] = useState('')
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '募集中'
      case 'reserved':
        return 'レンタル待ち'
      case 'started':
        return 'レンタル中'
      default:
        return '-'
    }
  }
  fetch(endpoint('battery', 'owner', session.currentUser.id))
    .then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then((body) => (body.battery as Battery).id)
    .then((batteryId) => fetch(endpoint('rental', 'battery', batteryId)))
    .then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then((body) => setStatus((body.rental as Rental).status))
    .catch(() => {})

  return (
    <Stack>
      <Text>ステータス：{getStatusText(status)}</Text>
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
