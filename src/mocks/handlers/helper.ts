export const accessLocalStorage = <T>(key: string) => {
  const getStorage = () => localStorage.getItem(key)
  const setStorage = (value: string) => localStorage.setItem(key, value)
  const parseStorage = (value: string) => JSON.parse(value) as T[]
  return [getStorage, setStorage, parseStorage] as const
}

export const endpoint = (...path: string[]): string => {
  const BASE_PATH = '/ict-solution/api'
  if (path === undefined) {
    return BASE_PATH
  }
  return [BASE_PATH, ...path].join('/')
}

export type User = {
  id: string
  name: string
  password: string
}

export type Battery = {
  id: string
  name: string
  connector: string
  note: string
  ownerId: string
}
