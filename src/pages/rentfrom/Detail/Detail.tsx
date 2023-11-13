import { useLoaderData, Link, useNavigate } from 'react-router-dom'
import { Battery, Rental, User, endpoint } from '../../../mocks/handlers'
import {
  Button,
  Card,
  Center,
  Grid,
  Group,
  Rating,
  Space,
  Stack,
  Text,
} from '@mantine/core'
import { Map } from '../../../components/Map'
import dayjs from 'dayjs'
import { useSession } from '../../../hooks/useSession'

export const Detail = () => {
  const [session] = useSession()
  const navigate = useNavigate()
  const { rental, battery, owner } = useLoaderData() as {
    rental: Rental
    battery: Battery
    owner: User
  }

  const handleSendRequestClicked = () => {
    if (session === undefined || !session.isLoggedIn) {
      return navigate('/')
    }
    fetch(endpoint('rental', 'reserve', rental.id), {
      body: JSON.stringify({ borrowerId: session.currentUser.id }),
      method: 'PUT',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return navigate('rentfrom/request')
      })
      .catch(() => navigate('/'))
  }

  return (
    <Stack mx="sm">
      <Card withBorder>
        <Group>
          <Rating value={parseInt(owner.review)} readOnly />
          <Text>{owner.name}</Text>
        </Group>
      </Card>
      <Card withBorder>
        <Grid>
          <Grid.Col span={4}>バッテリー</Grid.Col>
          <Grid.Col span={8}>
            <Text>{battery.name}</Text>
          </Grid.Col>
          <Grid.Col span={4}>対応ケーブル</Grid.Col>
          <Grid.Col span={8}>
            <Text>{battery.connector}</Text>
          </Grid.Col>
          <Grid.Col span={4}>時間</Grid.Col>
          <Grid.Col span={8}>
            <Text>{dayjs(rental.due).format('MM/DD HH:mm')} まで</Text>
          </Grid.Col>
        </Grid>
      </Card>
      {battery.note !== '' && (
        <Card withBorder>
          <Text>{battery.note}</Text>
        </Card>
      )}
      <Center>
        <Map lat={parseFloat(rental.lat)} lng={parseFloat(rental.lng)} />
      </Center>
      <Space />
      <Button
        component={Link}
        to="rentfrom/request"
        onClick={handleSendRequestClicked}
      >
        リクエストを送信
      </Button>
    </Stack>
  )
}
