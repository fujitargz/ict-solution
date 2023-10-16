import { useContext } from 'react'
import { usersContext } from '../contexts/users'

export const useUsers = () => useContext(usersContext)
