import { useMediaQuery } from '@mantine/hooks'
import { Button, Center, Group, ScrollArea, Stack } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'
import { seed } from '../../mocks/seed'

export const FrameWithInit = () => {
  const navigate = useNavigate()
  const isMobile = !useMediaQuery('(min-width: 640px')
  return isMobile ? (
    <Stack gap="0">
      <ScrollArea>
        <Center classNames={{ root: 'h-[calc(100dvh-50px)]' }}>
          <Outlet />
        </Center>
      </ScrollArea>
      <Group justify="flex-end" className="h-[50px]">
        <Button onClick={() => seed(() => navigate('/'))}>初期化</Button>
      </Group>
    </Stack>
  ) : (
    <div className="w-[430px] h-[800px] mx-auto border-solid border-8 border-black rounded-2xl">
      <Stack gap="0">
        <ScrollArea.Autosize mah={734}>
          <Center h={734}>
            <Outlet />
          </Center>
        </ScrollArea.Autosize>
        <Group justify="flex-end" className="h-[50px]">
          <Button onClick={() => seed(() => navigate('/'))}>初期化</Button>
        </Group>
      </Stack>
    </div>
  )
}
