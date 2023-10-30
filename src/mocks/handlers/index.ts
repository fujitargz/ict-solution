export * from './helper'
import { loginHandlers } from './login'
import { userHandlers } from './user'
import { batteryHandlers } from './battery'

export const handlers = [...loginHandlers, ...userHandlers, ...batteryHandlers]
