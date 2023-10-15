import { ReactNode } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { ScrollArea } from '@mantine/core'

export const Frame = ({ children }: { children: ReactNode }) => {
  const isMobile = !useMediaQuery('(min-width: 640px')
  return isMobile ? (
    <ScrollArea>{children}</ScrollArea>
  ) : (
    <div className="w-[430px] h-[800px] mx-auto border-solid border-8 border-black rounded-2xl">
      <ScrollArea.Autosize mah={784}>{children}</ScrollArea.Autosize>
    </div>
  )
}
