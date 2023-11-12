import { Button, Card, Center, PinInput, Stack, Text } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'
import { Battery, Rental, User } from '../../../mocks/handlers'
import dayjs from 'dayjs'

export const StartNumCheck = () => {
  const data = useLoaderData()
  const { rental, battery } = data as {
    rental: Rental
    battery: Battery
    owner: User
    borrower: User
  }
  return (
    <Stack>
      <Center>
        <Text>番号入力</Text>
      </Center>
      <Card withBorder>
        <Center>
          <Text>{battery.name}</Text>
        </Center>
      </Card>
      <Card withBorder>
        <Center>
          <Text>{dayjs(rental.due).format('MM/DD HH:mm')} まで</Text>
        </Center>
      </Card>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>パスコード入力フォーム</Text>
          </Center>
          <Center>
            <PinInput placeholder="0" length={6} />
          </Center>
          <Center>
            <Text>
              * 借り手にバッテリーを渡す前に
              <br />
              入力してください
            </Text>
          </Center>
        </Stack>
      </Card>
      <Button disabled>パスコードを確認</Button>
    </Stack>
  )
}
