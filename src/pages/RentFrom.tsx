import { Button, Center, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

export const RentFrom = () => {
  return (
    <Stack>
      <Center>
        <Text>借りる</Text>
      </Center>
      <Button component={Link} to="/rentfrom/list">
        募集を探す
      </Button>
      <Button component={Link} to="/rentfrom/request">
        リクエスト確認
      </Button>
      <Button disabled>番号入力（返す）</Button>
      <Button component={Link} to="/help">
        何かあった時は...
      </Button>
    </Stack>
  )
}
