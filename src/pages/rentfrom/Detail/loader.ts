import { LoaderFunction } from 'react-router-dom'
import { Battery, Rental, User, endpoint } from '../../../mocks/handlers'

export const detailLoader: LoaderFunction = async ({ params }) => {
  const rental = await fetch(
    endpoint('rental', 'detail', params.rentalId || ''),
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
  return rental
}
