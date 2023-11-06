import { Center, Group, Paper, Stack, Text } from '@mantine/core'
import { Link, useLoaderData } from 'react-router-dom'

export const List = () => {
  const items = useLoaderData() as {
    rentalId: string
    distance: string
    owner: string
    connector: string
  }[]

  return (
    <Stack>
      <Center>
        <Text>借りる</Text>
      </Center>
      {items.map(({ rentalId, distance, owner, connector }, i) => (
        <Paper
          key={i}
          component={Link}
          to={`/rentfrom/detail/${rentalId}`}
          shadow="xs"
          withBorder
          px="xl"
          py="md"
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
