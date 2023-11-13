import { createBrowserRouter } from 'react-router-dom'
import { Root } from './pages/Root'
import { Login } from './pages/Login'
import { RentFrom } from './pages/RentFrom'
import { RentTo } from './pages/RentTo'
import { SignUp } from './pages/SignUp'
import { TOS } from './pages/TOS'
import { Register as BatteryRegister } from './pages/battery/Register'
import { Start as RentToStart } from './pages/rentto/Start'
import { FrameWithInit } from './components/FrameWithInit'
import { FramwWithBack } from './components/FrameWithBack'
import { FrameWithFooter } from './components/FrameWithFooter'
import { Detail, detailLoader } from './pages/rentfrom/Detail'
import { List as RentFromList, listLoader } from './pages/rentfrom/List'
import {
  Request as RentFromRequest,
  requestLoader,
} from './pages/rentfrom/Request'
import { RequestList, requestListLoader } from './pages/rentto/RequestList'
import {
  StartNumCheck,
  startNumCheckLoader,
} from './pages/rentto/StartNumCheck'
import {
  ShowReturnNum,
  showReturnNumLoader,
} from './pages/rentto/ShowReturnNum'
import { RentToReview } from './pages/rentto/RentToReview'

export const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <FrameWithFooter />,
      index: false,
      children: [
        {
          path: '/',
          element: <Root />,
        },
        {
          path: '/rentfrom',
          element: <RentFrom />,
        },
        {
          path: '/rentfrom/list',
          loader: listLoader,
          element: <RentFromList />,
        },
        {
          path: '/rentfrom/request',
          loader: requestLoader,
          element: <RentFromRequest />,
        },
        {
          path: '/rentfrom/detail/:rentalId',
          loader: detailLoader,
          element: <Detail />,
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
          path: '/rentto/request/list',
          loader: requestListLoader,
          element: <RequestList />,
        },
        {
          path: '/rentto/startnumcheck',
          loader: startNumCheckLoader,
          element: <StartNumCheck />,
        },
        {
          path: '/rentto/endnum',
          loader: showReturnNumLoader,
          element: <ShowReturnNum />,
        },
        {
          path: '/rentto/review/:borrowerId',
          element: <RentToReview />,
        },
        { path: '/battery/register', element: <BatteryRegister /> },
      ],
    },
    {
      path: '/',
      element: <FrameWithInit />,
      children: [
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
      ],
    },
    {
      path: '/',
      element: <FramwWithBack />,
      children: [{ path: '/tos', element: <TOS /> }],
    },
  ],
  { basename: '/ict-solution/' },
)
