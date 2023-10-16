import { useContext } from 'react'
import { sessionDispatchContext } from '../contexts/session'

export const useSessionDispatch = () => useContext(sessionDispatchContext)
