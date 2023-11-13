import { Button, Card, Center, PinInput, Stack, Text } from '@mantine/core'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Battery, Rental, User, endpoint } from '../../../mocks/handlers'
import dayjs from 'dayjs'
import { useState } from 'react'

export const ReturnNumCheck = () => {
  const navigate = useNavigate()
  const data = useLoaderData()
  const { rental, battery } = data as {
    rental: Rental
    battery: Battery
    owner: User
    borrower: User
  }

  const [otp, setOtp] = useState('')

  const handleReturnButtonClick = () => {
    fetch(endpoint('rental', 'return', rental.id), {
      method: 'PUT',
      body: JSON.stringify({ otp }),
    }).then((res) => {
      if (!res.ok) {
        navigate('/rentfrom')
      } else {
        navigate('/payment')
      }
    })
  }

  return (
    <Stack>
      <Center>
        <Text>番号入力（返す）</Text>
      </Center>
      <Card withBorder>
        <Center>
          <Text>{battery.name}</Text>
        </Center>
      </Card>
      <Card withBorder>
        <Center>
          <Text>{dayjs(rental.due).format('MM/DD HH:mm')} まで</Text>
        </Center>
      </Card>
      <Card withBorder>
        <Stack>
          <Center>
            <Text>パスコード入力フォーム</Text>
          </Center>
          <Center>
            <PinInput
              placeholder="0"
              length={6}
              value={otp}
              onChange={(e) => setOtp(e)}
            />
          </Center>
          <Center>
            <Text>
              * 借り手にバッテリーを返す前に
              <br />
              入力してください
            </Text>
          </Center>
        </Stack>
      </Card>
      <Button onClick={handleReturnButtonClick}>パスコードを確認</Button>
    </Stack>
  )
}
