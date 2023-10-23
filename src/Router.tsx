import { createBrowserRouter } from 'react-router-dom'
import { Root } from './pages/Root'
import { Login } from './pages/Login'
import { RentFrom } from './pages/RentFrom'
import { RentTo } from './pages/RentTo'
import { SignUp } from './pages/SignUp'
import { TOS } from './pages/TOS'

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
      path: '/signup',
      element: <SignUp />,
    },
    { path: '/tos', element: <TOS /> },
  ],
  { basename: '/ict-solution' },
)
