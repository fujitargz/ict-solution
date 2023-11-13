import { Button, Card, Center, Grid, Stack, Text, Title } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import { Battery, Rental, User } from '../../../mocks/handlers'
import { Map } from '../../../components/Map'

export const ShowReturnNum = () => {
  const data = useLoaderData()
  const { rental, borrower } = data as {
    rental: Rental
    battery: Battery
    owner: User
    borrower: User
  }

  return (
    <Stack mx="sm">
      <Card withBorder>
        <Grid>
          <Grid.Col span={4}>ユーザ名</Grid.Col>
          <Grid.Col span={8}>
            <Text>{borrower.name}</Text>
          </Grid.Col>
        </Grid>
      </Card>
      <Center>
        <Map lat={parseFloat(rental.lat)} lng={parseFloat(rental.lng)} />
      </Center>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>返却パスコード</Text>
          </Center>
          <Center>
            <Title>{rental.otp}</Title>
          </Center>
          <Center>
            <Text>*返却時に貸し主に伝えてください</Text>
          </Center>
        </Stack>
      </Card>
      <Button disabled>次へ</Button>
    </Stack>
  )
}
