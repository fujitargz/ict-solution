import { Battery, Rental, User } from '../../../mocks/handlers'
import { Button, Card, Center, Space, Stack, Text } from '@mantine/core'
import { useLoaderData } from 'react-router-dom'

export const RequestList = () => {
  const data = useLoaderData()
  if (data === null) {
    return (
      <Stack>
        <Center>
          <Text>リクエスト確認</Text>
        </Center>
        <Space />
        <Text>リクエストはありません</Text>
      </Stack>
    )
  }
  const { borrower } = data as {
    rental: Rental
    battery: Battery
    owner: User
    borrower: User
  }
  return (
    <Stack>
      <Center>
        <Text>リクエスト確認</Text>
      </Center>
      <Space />
      <Text>リクエストが届いています</Text>
      <Card withBorder>
        <Text>{borrower.name}さん</Text>
      </Card>
      <Space />
      <Button disabled>リクエストを承認する</Button>
      <Button disabled color="red">
        リクエストを拒否する
      </Button>
    </Stack>
  )
}
