import { Dispatch, createContext, useReducer, ReactNode } from 'react'
import { usersData } from '../data/users'

type StateType = typeof usersData

type ActionType = { type: 'create'; name: string; password: string }

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'create': {
      const newId = state.reduce((ctr, { id }) => (id > ctr ? id : ctr), 0)
      return [
        ...state,
        { id: newId, name: action.name, password: action.password },
      ]
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
