import { Center, Space, Stack, Text } from '@mantine/core'

export const TOS = () => {
  const txt1 = [...Array(100)].map(() => '規約').join('')
  const txt2 = [...Array(100)].map(() => '紛失').join('')
  return (
    <Stack>
      <Center>
        <Text size="xl">利用規約</Text>
      </Center>
      <Space />
      <Text>{[txt1, txt2, txt1].join('\n')}</Text>
    </Stack>
  )
}
