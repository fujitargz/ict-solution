import { LoaderFunction } from 'react-router-dom'
import { endpoint, Battery, Rental, User } from '../../../mocks/handlers'

export const listLoader: LoaderFunction = async () => {
  const result = await fetch(endpoint('rental', 'available'))
    .then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then(
      (body) =>
        body.rentals as { rental: Rental; battery: Battery; owner: User }[],
    )
    .then((rentals) =>
      rentals.map(({ rental, battery, owner }) => ({
        rentalId: rental.id,
        distance: calcDistance(parseFloat(rental.lat), parseFloat(rental.lng)),
        owner: owner.name,
        connector: battery.connector,
      })),
    )
  return result
}

// https://qiita.com/kawanet/items/a2e111b17b8eb5ac859a
const calcDistance = (lat: number, lng: number) => {
  const defaultLat = 36.57332723779
  const defaultLng = 140.64191798417
  return (
    6371 *
    Math.acos(
      Math.cos(lat) * Math.cos(defaultLat) * Math.cos(defaultLng - lng) +
        Math.sin(lat) * Math.sin(defaultLat),
    )
  ).toFixed(1)
}
