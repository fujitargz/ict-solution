import { useContext } from 'react'
import { usersDispatchContext } from '../contexts/users'

export const useUsersDispatch = () => useContext(usersDispatchContext)
