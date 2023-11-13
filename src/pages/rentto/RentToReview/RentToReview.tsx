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
import { endpoint } from '../../../mocks/handlers'
import { useNavigate, useParams } from 'react-router-dom'

export const RentToReview = () => {
  const navigate = useNavigate()
  const { borrowerId } = useParams()
  const [rating, setRating] = useState(0)

  const handleFinishReviewButtonClick = () => {
    fetch(endpoint('user', 'review', borrowerId || ''), {
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
            <Text>借り手の評価</Text>
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
