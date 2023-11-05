import { http, HttpResponse, PathParams } from 'msw'
import { accessLocalStorage, endpoint, User } from './helper'

const [getStorage, setStorage, parseStorage] =
  accessLocalStorage<User>('ict-solution-user')

export const userHandlers = [
  // 全ユーザを取得
  http.get(endpoint('user'), () => {
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ users: [] })
    }

    return HttpResponse.json({ users: parseStorage(storage) })
  }),

  // idで指定されたユーザを取得
  http.get<{ id: string }>(endpoint('user', ':id'), ({ params }) => {
    const { id } = params
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ error: 'User Not Found' }, { status: 404 })
    }

    const data = parseStorage(storage)
    const target = data.find((user) => user.id === id)
    if (target === undefined) {
      return HttpResponse.json({ error: 'User Not Found' }, { status: 404 })
    }

    return HttpResponse.json({ user: target })
  }),

  // ユーザを作成
  http.post<PathParams, { name: string; password: string }>(
    endpoint('user'),
    ({ request }) =>
      request
        .clone()
        .json()
        .then((body) => {
          const newUser: User = { id: crypto.randomUUID(), ...body }
          const storage = getStorage()
          if (storage === null) {
            setStorage(JSON.stringify([newUser]))
            return HttpResponse.json({ user: newUser }, { status: 201 })
          }

          const data = parseStorage(storage)

          if (data.some(({ name }) => name === body.name)) {
            return HttpResponse.json({ error: 'Bad Request' }, { status: 400 })
          }

          setStorage(JSON.stringify([...data, newUser]))
          return HttpResponse.json({ user: newUser }, { status: 201 })
        }),
  ),

  // idで指定されたユーザを更新
  http.put<{ id: string }, { name: string; password: string }>(
    endpoint('user', ':id'),
    ({ params, request }) => {
      const { id } = params
      request.json().then((body) => {
        const storage = getStorage()
        if (storage === null) {
          return HttpResponse.json({ error: 'User Not Found' }, { status: 404 })
        }

        const data = parseStorage(storage)
        const target = data.find((user) => user.id === id)
        if (target === undefined) {
          return HttpResponse.json({ error: 'User Not Found' }, { status: 404 })
        }

        const updatedUser: User = {
          id: target.id,
          name: body.name || target.name,
          password: body.password || target.password,
        }
        setStorage(
          JSON.stringify(
            data.map((user) => (user.id === id ? updatedUser : user)),
          ),
        )
        return HttpResponse.json({ user: updatedUser })
      })
    },
  ),

  // idで指定されたユーザを削除
  http.delete<{ id: string }>(endpoint('user', ':id'), ({ params }) => {
    const { id } = params
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ error: 'User Not Found' }, { status: 404 })
    }

    const data = parseStorage(storage)
    const target = data.find((user) => user.id === id)
    if (target === undefined) {
      return HttpResponse.json({ error: 'User Not Found' }, { status: 404 })
    }

    setStorage(JSON.stringify(data.filter((user) => user.id !== id)))
    return HttpResponse.json({ user: target })
  }),
]
