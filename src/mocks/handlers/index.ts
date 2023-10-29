export * from './helper'
import { loginHandlers } from './login'
import { userHandlers } from './user'

export const handlers = [...loginHandlers, ...userHandlers]
