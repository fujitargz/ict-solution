import { Button, Center, Stack, Text } from '@mantine/core'

export const Help = () => {
  return (
    <Stack>
      <Center>
        <Text>何かあった時は...</Text>
      </Center>
      <Button>なくした・壊れた</Button>
      <Button>貸し手が来ない</Button>
      <Button>返すことができない</Button>
      <Button>その他</Button>
    </Stack>
  )
}
