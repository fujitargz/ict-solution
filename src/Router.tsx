import { createBrowserRouter } from 'react-router-dom'
import { Root } from './pages/Root'
import { Login } from './pages/Login'
import { RentFrom } from './pages/RentFrom'
import { RentTo } from './pages/RentTo'
import { SignUp } from './pages/SignUp'
import { TOS } from './pages/TOS'
import { Register as BatteryRegister } from './pages/battery/Register'
import { Start as RentToStart } from './pages/rentto/Start'

export const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/rentfrom',
      element: <RentFrom />,
    },
    {
      path: '/rentto',
      element: <RentTo />,
    },
    {
      path: '/rentto/start',
      element: <RentToStart />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    { path: '/tos', element: <TOS /> },
    { path: '/battery/register', element: <BatteryRegister /> },
  ],
  { basename: '/ict-solution/' },
)
