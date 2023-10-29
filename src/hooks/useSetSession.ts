import { useContext } from 'react'
import { StateType, setSessionContext } from '../contexts/session'

export const useSetSession = () => useContext(setSessionContext)

export const setSessionManually = (value: StateType) =>
  sessionStorage.setItem('login', JSON.stringify(value))
