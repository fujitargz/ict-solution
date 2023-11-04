import { Battery, User, endpoint } from './handlers'

export const seed = () => {
  localStorage.clear()
  sessionStorage.clear()

  fetch(endpoint('user'), {
    body: JSON.stringify({ name: 'test1', password: 'test1' }),
    method: 'POST',
  })
    .then((res) => res.json())
    .then(({ user }) => user as User)
    .then((user) =>
      fetch(endpoint('battery'), {
        body: JSON.stringify({
          name: 'Anker PowerCore Magnetic 5000',
          connector: 'USB-C',
          note: '',
          ownerId: user.id,
        }),
        method: 'POST',
      }),
    )
    .then((res) => res.json())
    .then(({ battery }) => battery as Battery)
    .then(() => {
      location.href = '/'
    })
}
