import { createContext, ReactNode } from 'react'
import { useSessionStorage } from '@mantine/hooks'
import { User } from '../mocks/handlers'

export type StateType =
  | {
      successLogIn: boolean | 'yet'
      isLoggedIn: true
      currentUser: User
    }
  | {
      successLogIn: boolean | 'yet'
      isLoggedIn: false
    }

// eslint-disable-next-line react-refresh/only-export-components
export const initState: StateType = { successLogIn: 'yet', isLoggedIn: false }

// eslint-disable-next-line react-refresh/only-export-components
export const sessionContext =
  createContext<ReturnType<typeof useSessionStorage<StateType>>[0]>(initState)

// eslint-disable-next-line react-refresh/only-export-components
export const setSessionContext = createContext<
  ReturnType<typeof useSessionStorage<StateType>>[1]
>(() => {})

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [session, setSession] = useSessionStorage<StateType>({
    key: 'login',
    defaultValue: initState,
    getInitialValueInEffect: true,
    serialize: (v) => JSON.stringify(v),
    deserialize: (v) => JSON.parse(v as string),
  })
  return (
    <sessionContext.Provider value={session as StateType}>
      <setSessionContext.Provider value={setSession}>
        {children}
      </setSessionContext.Provider>
    </sessionContext.Provider>
  )
}
