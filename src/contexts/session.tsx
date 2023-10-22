import { Dispatch, createContext, useReducer, ReactNode } from 'react'
import { useUsers } from '../hooks/useUsers'

type StateType =
  | {
      successLogIn: boolean | 'yet'
      isLoggedIn: true
      currentUser: ReturnType<typeof useUsers>[number]
    }
  | {
      successLogIn: boolean | 'yet'
      isLoggedIn: false
    }

type ActionType =
  | { type: 'login'; name: string; password: string }
  | { type: 'logout' }

const reducer =
  (users: ReturnType<typeof useUsers>) =>
  (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
      case 'login': {
        const result = users.find(
          ({ name, password }) =>
            name === action.name && password === action.password,
        )
        if (result !== undefined) {
          return { successLogIn: true, isLoggedIn: true, currentUser: result }
        } else {
          return { ...state, successLogIn: false }
        }
      }
      case 'logout': {
        return { successLogIn: 'yet', isLoggedIn: false }
      }
    }
  }

const initState: StateType = { successLogIn: 'yet', isLoggedIn: false }

// eslint-disable-next-line react-refresh/only-export-components
export const sessionContext = createContext<StateType>(initState)

// eslint-disable-next-line react-refresh/only-export-components
export const sessionDispatchContext = createContext<Dispatch<ActionType>>(
  () => {},
)

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const users = useUsers()
  const [state, dispatch] = useReducer(reducer(users), initState)
  return (
    <sessionContext.Provider value={state}>
      <sessionDispatchContext.Provider value={dispatch}>
        {children}
      </sessionDispatchContext.Provider>
    </sessionContext.Provider>
  )
}
