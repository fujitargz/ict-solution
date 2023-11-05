import { Center, Group, Paper, Stack, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Battery, endpoint, Rental, User } from '../mocks/handlers'

export const RentFrom = () => {
  const [items, setItems] = useState<
    { distance: string; owner: string; connector: string }[]
  >([])

  // https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a
  const calcDistance = (lat: number, lng: number) => {
    const defaultLat = 36.57332723779
    const defaultLng = 140.64191798417
    return (
      6371 *
      Math.acos(
        Math.cos(lat) * Math.cos(defaultLat) * Math.cos(defaultLng - lng) +
          Math.sin(lat) * Math.sin(defaultLat),
      )
    ).toFixed(1)
  }

  useEffect(() => {
    fetch(endpoint('rental', 'available'))
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then(
        (body) =>
          body.rentals as { rental: Rental; battery: Battery; owner: User }[],
      )
      .then((rentals) =>
        setItems(
          rentals.map(({ rental, battery, owner }) => ({
            distance: calcDistance(
              parseFloat(rental.lat),
              parseFloat(rental.lng),
            ),
            owner: owner.name,
            connector: battery.connector,
          })),
        ),
      )
      .catch(() => {})
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack>
      <Center>
        <Text>借りる</Text>
      </Center>
      {items.map(({ distance, owner, connector }, i) => (
        <Paper
          key={i}
          className="hover:cursor-pointer"
          shadow="xs"
          withBorder
          px="xl"
          py="md"
          onClick={() => console.log('clicked')}
        >
          <Group>
            <Text>{distance}km</Text>
            <Text>{owner}さん</Text>
          </Group>
          <Text>対応：{connector}</Text>
        </Paper>
      ))}
    </Stack>
  )
}
