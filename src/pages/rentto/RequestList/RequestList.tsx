import { Battery, Rental, User, endpoint } from '../../../mocks/handlers'
import {
  Button,
  Card,
  Center,
  Group,
  Rating,
  Space,
  Stack,
  Text,
} from '@mantine/core'
import { useLoaderData, useNavigate } from 'react-router-dom'

export const RequestList = () => {
  const data = useLoaderData()
  const navigate = useNavigate()
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
  const { rental, borrower } = data as {
    rental: Rental
    battery: Battery
    owner: User
    borrower: User
  }

  const handleApproveButtonClick = () => {
    fetch(endpoint('rental', 'approve', rental.id), { method: 'PUT' }).then(
      (res) => {
        if (!res.ok) {
          navigate('/rentto')
        } else {
          navigate('/rentto/startnumcheck')
        }
      },
    )
  }

  return (
    <Stack>
      <Center>
        <Text>リクエスト確認</Text>
      </Center>
      <Space />
      <Text>リクエストが届いています</Text>
      <Card withBorder>
        <Group>
          <Rating value={parseInt(borrower.review)} readOnly />
          <Text>{borrower.name}さん</Text>
        </Group>
      </Card>
      <Space />
      <Button onClick={handleApproveButtonClick}>リクエストを承認する</Button>
      <Button color="red">リクエストを拒否する</Button>
    </Stack>
  )
}
