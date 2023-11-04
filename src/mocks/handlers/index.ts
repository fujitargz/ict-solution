export * from './helper'
import { loginHandlers } from './login'
import { userHandlers } from './user'
import { batteryHandlers } from './battery'
import { rentalHandlers } from './rental'

export const handlers = [
  ...loginHandlers,
  ...userHandlers,
  ...batteryHandlers,
  ...rentalHandlers,
]
