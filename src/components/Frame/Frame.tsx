import { ReactNode } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { Center, ScrollArea } from '@mantine/core'

export const Frame = ({ children }: { children: ReactNode }) => {
  const isMobile = !useMediaQuery('(min-width: 640px')
  return isMobile ? (
    <ScrollArea>
      <Center classNames={{ root: 'h-screen' }}>{children}</Center>
    </ScrollArea>
  ) : (
    <div className="w-[430px] h-[800px] mx-auto border-solid border-8 border-black rounded-2xl">
      <ScrollArea.Autosize mah={784}>
        <Center h={784}>{children}</Center>
      </ScrollArea.Autosize>
    </div>
  )
}
