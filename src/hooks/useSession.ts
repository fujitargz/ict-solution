import { useContext } from 'react'
import { sessionContext } from '../contexts/session'

export const useSession = () => useContext(sessionContext)
