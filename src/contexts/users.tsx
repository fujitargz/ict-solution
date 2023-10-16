import { Dispatch, createContext, useReducer, ReactNode } from 'react'
import { usersData } from '../data/users'

type StateType = typeof usersData

type ActionType = { type: 'create'; user: (typeof usersData)[number] }

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'create': {
      return [...state, action.user]
    }
  }
}

const initState: StateType = usersData

export const usersContext = createContext(initState)

export const usersDispatchContext = createContext<Dispatch<ActionType>>(
  () => {},
)

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <usersContext.Provider value={state}>
      <usersDispatchContext.Provider value={dispatch}>
        {children}
      </usersDispatchContext.Provider>
    </usersContext.Provider>
  )
}
