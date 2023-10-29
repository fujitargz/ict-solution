import { useContext } from 'react'
import { initState, sessionContext } from '../contexts/session'

export const useSession = () => [useContext(sessionContext), initState] as const

export const checkSessionManually = () =>
  JSON.parse(
    sessionStorage.getItem('login') ?? JSON.stringify(initState),
  ) as NonNullable<ReturnType<typeof useSession>[0]>
