import { useMediaQuery } from '@mantine/hooks'
import { Button, Center, Group, ScrollArea, Stack } from '@mantine/core'
import { Outlet, useNavigate } from 'react-router-dom'

export const FramwWithBack = () => {
  const navigate = useNavigate()
  const isMobile = !useMediaQuery('(min-width: 640px')
  return isMobile ? (
    <Stack gap="0">
      <ScrollArea>
        <Center classNames={{ root: 'h-[calc(100dvh-50px)]' }}>
          <Outlet />
        </Center>
      </ScrollArea>
      <Group className="h-[50px]">
        <Button variant="outline" onClick={() => navigate(-1)}>
          戻る
        </Button>
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
        <Group className="h-[50px]">
          <Button variant="outline" onClick={() => navigate(-1)}>
            戻る
          </Button>
        </Group>
      </Stack>
    </div>
  )
}
