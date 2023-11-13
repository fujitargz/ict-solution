import {
  Button,
  Card,
  Center,
  Rating,
  Stack,
  Text,
  Textarea,
} from '@mantine/core'
import { useState } from 'react'
import { Battery, Rental, User, endpoint } from '../../../mocks/handlers'
import { useLoaderData, useNavigate } from 'react-router-dom'

export const RentFromReview = () => {
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const data = useLoaderData()
  const { owner } = data as {
    rental: Rental
    battery: Battery
    owner: User
  }

  const handleFinishReviewButtonClick = () => {
    fetch(endpoint('user', 'review', owner.id), {
      body: JSON.stringify({ review: rating }),
      method: 'PUT',
    }).then(() => navigate('/'))
  }

  return (
    <Stack>
      <Text>今回の貸し出しはいかがでしたか</Text>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>借し手の評価</Text>
          </Center>
          <Center>
            <Rating value={rating} onChange={(e) => setRating(e)}></Rating>
          </Center>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>サービスの評価</Text>
          </Center>
          <Center>
            <Rating />
          </Center>
        </Stack>
      </Card>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>その他</Text>
          </Center>
          <Center>
            <Textarea />
          </Center>
        </Stack>
      </Card>
      <Button onClick={handleFinishReviewButtonClick}>回答終了</Button>
    </Stack>
  )
}
