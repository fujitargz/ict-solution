import { Button, Center, Space, Stack, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const RentTo = () => {
  const navigate = useNavigate()

  return (
    <Stack>
      <Center>
        <Text size="xl">貸す</Text>
      </Center>
      <Space />
      <Button onClick={() => navigate('/rentto/start')}>貸し出し開始</Button>
      <Button disabled>貸し出し終了</Button>
      <Button onClick={() => navigate('/battery/register')}>
        バッテリーの登録
      </Button>
      <Button disabled>バッテリーの削除</Button>
    </Stack>
  )
}
