import { createBrowserRouter } from 'react-router-dom'
import { Root } from './pages/Root'
import { Login } from './pages/Login'
import { RentFrom } from './pages/RentFrom'
import { RentTo } from './pages/RentTo'
import { SignUp } from './pages/SignUp'

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
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/rentfrom',
      element: <RentFrom />,
    },
    {
      path: '/rentto',
      element: <RentTo />,
    },
  ],
  { basename: '/ict-solution' },
)
