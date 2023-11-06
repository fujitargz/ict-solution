import { useLoaderData } from 'react-router-dom'
import { Battery, Rental, User } from '../../../mocks/handlers'
import { Button, Card, Center, Grid, Space, Stack, Text } from '@mantine/core'
import { Map } from '../../../components/Map'
import dayjs from 'dayjs'

export const Detail = () => {
  const { rental, battery, owner } = useLoaderData() as {
    rental: Rental
    battery: Battery
    owner: User
  }
  return (
    <Stack mx="sm">
      <Card withBorder>
        <Text>{owner.name}</Text>
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
      <Button disabled>リクエストを送信</Button>
    </Stack>
  )
}
