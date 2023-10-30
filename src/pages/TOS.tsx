import { useNavigate } from 'react-router'
import { Button, Space, Stack, Text } from '@mantine/core'

export const TOS = () => {
  const navigate = useNavigate()
  const txt1 = [...Array(100)].map(() => '規約').join('')
  const txt2 = [...Array(100)].map(() => '紛失').join('')
  return (
    <Stack>
      <Text size="xl">利用規約</Text>
      <Space />
      <Text>{[txt1, txt2, txt1].join('\n')}</Text>
      <Button onClick={() => navigate(-1)}>戻る</Button>
    </Stack>
  )
}
