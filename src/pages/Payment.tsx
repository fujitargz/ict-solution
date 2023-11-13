import {
  Button,
  Card,
  Center,
  Checkbox,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useState } from 'react'

export const Payment = () => {
  const [paid, setPaid] = useState(false)

  return (
    <Stack>
      <Text>決済</Text>
      <Card withBorder>
        <Center>
          <Text>レンタル時間</Text>
        </Center>
        <Center>
          <Title>4h47m</Title>
        </Center>
        <Center>
          <Text>料金</Text>
        </Center>
        <Center>
          <Title>￥2,000</Title>
        </Center>
      </Card>
      <Card withBorder>
        <Stack>
          <Center>
            {paid ? (
              <Group>
                <Checkbox checked />
                <Text>お支払いが完了しました</Text>
              </Group>
            ) : (
              <Button onClick={() => setPaid(true)}>決済する</Button>
            )}
          </Center>
          <Center>
            <Text>既定の支払い方法: paypay</Text>
          </Center>
        </Stack>
      </Card>
      <Button disabled={!paid}>次へ</Button>
    </Stack>
  )
}
