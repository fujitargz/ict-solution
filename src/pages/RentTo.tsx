import { Button, Center, Space, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'
import { endpoint, Battery, Rental } from '../mocks/handlers'

export const RentTo = () => {
  const [session] = useSession()
  const navigate = useNavigate()

  const handleEndRentButtonClick = () => {
    if (!session?.isLoggedIn) {
      return navigate('/login')
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
      .then((body) => (body.rental as Rental).id)
      .then((id) =>
        fetch(endpoint('rental', id), {
          method: 'DELETE',
        }),
      )
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
      })
      .catch(() => navigate('/rentto'))
  }

  const handleRemoveButteryButtonClick = () => {
    if (!session?.isLoggedIn) {
      return navigate('/login')
    }

    fetch(endpoint('battery', 'owner', session.currentUser.id))
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then((body) => (body.battery as Battery).id)
      .then((batteryId) =>
        fetch(endpoint('battery', batteryId), {
          method: 'DELETE',
        }),
      )
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
      })
      .catch(() => navigate('/rentto'))
  }

  return (
    <Stack>
      <Center>
        <Text size="xl">貸す</Text>
      </Center>
      <Space />
      <Button onClick={() => navigate('/rentto/start')}>貸し出し開始</Button>
      <Button onClick={handleEndRentButtonClick}>貸し出し終了</Button>
      <Space />
      <Button onClick={() => navigate('/battery/register')}>
        バッテリーの登録
      </Button>
      <Button onClick={handleRemoveButteryButtonClick}>バッテリーの削除</Button>
      <Space />
      <Button onClick={() => navigate('/rentto/request/list')}>
        リクエスト
      </Button>
    </Stack>
  )
}
