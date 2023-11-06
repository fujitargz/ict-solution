import { Button, Center, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export const RentFrom = () => {
  return (
    <Stack>
      <Center>
        <Text>借りる</Text>
      </Center>
      <Button component={Link} to="/rentfrom/list">
        一覧で探す
      </Button>
      <Button disabled>リクエストを確認する</Button>
    </Stack>
  )
}
