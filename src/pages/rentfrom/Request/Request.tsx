import { useLoaderData } from 'react-router-dom'
import { Button, Card, Center, Grid, Stack, Text, Title } from '@mantine/core'
import { Battery, Rental, User } from '../../../mocks/handlers'
import { Map } from '../../../components/Map'

export const Request = () => {
  const { rental, owner } = useLoaderData() as {
    rental: Rental
    battery: Battery
    owner: User
  }

  return (
    <Stack mx="sm">
      <Card withBorder>
        <Grid>
          <Grid.Col span={4}>ユーザ名</Grid.Col>
          <Grid.Col span={8}>
            <Text>{owner.name}</Text>
          </Grid.Col>
        </Grid>
      </Card>
      <Center>
        <Map lat={parseFloat(rental.lat)} lng={parseFloat(rental.lng)} />
      </Center>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>レンタルパスコード</Text>
          </Center>
          <Center>
            <Title>{rental.otp}</Title>
          </Center>
          <Center>
            <Text>*レンタル開始時に貸し主に伝えてください</Text>
          </Center>
        </Stack>
      </Card>
      <Button disabled>リクエストを取り消し</Button>
    </Stack>
  )
}
