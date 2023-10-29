import { http, HttpResponse, PathParams } from 'msw'
import { accessLocalStorage, endpoint, User } from './helper'

const [getStorage, , parseStorage] =
  accessLocalStorage<User>('ict-solution-user')

export const loginHandlers = [
  // ログイン試行
  http.post<PathParams, { name: string; password: string }>(
    endpoint('login'),
    ({ request }) =>
      request.json().then((body) => {
        const storage = getStorage()
        if (storage === null) {
          return HttpResponse.json(
            { error: 'Unable to Authenticate' },
            { status: 401 },
          )
        }

        const data = parseStorage(storage)
        const target = data.find(
          ({ name, password }) =>
            name === body.name && password === body.password,
        )
        if (target === undefined) {
          return HttpResponse.json(
            { error: 'Unable to Authenticate' },
            { status: 401 },
          )
        }

        return HttpResponse.json({ user: target })
      }),
  ),
]
