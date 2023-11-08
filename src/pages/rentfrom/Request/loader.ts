import { LoaderFunction } from 'react-router-dom'
import { Battery, Rental, User, endpoint } from '../../../mocks/handlers'
import { checkSessionManually } from '../../../hooks/useSession'

export const requestLoader: LoaderFunction = async () => {
  const session = checkSessionManually()
  if (!session.isLoggedIn) {
    throw new Error()
  }
  const rental = await fetch(
    endpoint('rental', 'request', session.currentUser.id),
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then(
      (body) =>
        body.rental as { rental: Rental; battery: Battery; owner: User },
    )
    .catch(() => null)
  return rental
}
