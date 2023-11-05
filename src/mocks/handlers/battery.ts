import { http, HttpResponse, PathParams } from 'msw'
import { accessLocalStorage, endpoint, Battery } from './helper'

const [getStorage, setStorage, parseStorage] = accessLocalStorage<Battery>(
  'ict-solution-battery',
)

export const batteryHandlers = [
  // 全バッテリーを取得
  http.get(endpoint('battery'), () => {
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ batteries: [] })
    }

    return HttpResponse.json({ batteries: parseStorage(storage) })
  }),

  // idで指定されたバッテリーを取得
  http.get<{ id: string }>(endpoint('battery', ':id'), ({ params }) => {
    const { id } = params
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ error: 'Battery Not Found' }, { status: 404 })
    }

    const data = parseStorage(storage)
    const target = data.find((battery) => battery.id === id)
    if (target === undefined) {
      return HttpResponse.json({ error: 'Battery Not Found' }, { status: 404 })
    }

    return HttpResponse.json({ battery: target })
  }),

  // owneridで指定されたバッテリーを取得
  http.get<{ id: string }>(
    endpoint('battery', 'owner', ':id'),
    ({ params }) => {
      const { id } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json(
          { error: 'Battery Not Found' },
          { status: 404 },
        )
      }

      const data = parseStorage(storage)
      const target = data.find((battery) => battery.ownerId === id)
      if (target === undefined) {
        return HttpResponse.json(
          { error: 'Battery Not Found' },
          { status: 404 },
        )
      }

      return HttpResponse.json({ battery: target })
    },
  ),

  // バッテリーを作成
  http.post<
    PathParams,
    { name: string; connector: string; note: string; ownerId: string }
  >(endpoint('battery'), ({ request }) =>
    request
      .clone()
      .json()
      .then((body) => {
        const newBattery: Battery = { id: crypto.randomUUID(), ...body }
        const storage = getStorage()
        if (storage === null) {
          setStorage(JSON.stringify([newBattery]))
          return HttpResponse.json({ user: newBattery }, { status: 201 })
        }

        const data = parseStorage(storage)

        if (
          data.some(
            ({ name, ownerId }) =>
              name === body.name && ownerId === body.ownerId,
          )
        ) {
          return HttpResponse.json({ error: 'Bad Request' }, { status: 400 })
        }

        setStorage(JSON.stringify([...data, newBattery]))
        return HttpResponse.json({ battery: newBattery }, { status: 201 })
      }),
  ),

  // idで指定されたバッテリーを更新
  http.put<{ id: string }, { name: string; connector: string; note: string }>(
    endpoint('battery'),
    ({ params, request }) => {
      const { id } = params
      request.json().then((body) => {
        const storage = getStorage()
        if (storage === null) {
          return HttpResponse.json(
            { error: 'Battery Not Found' },
            { status: 404 },
          )
        }

        const data = parseStorage(storage)
        const target = data.find((battery) => battery.id === id)
        if (target === undefined) {
          return HttpResponse.json(
            { error: 'Battery Not Found' },
            { status: 404 },
          )
        }

        const updatedBattery: Battery = {
          id: target.id,
          name: body.name || target.name,
          connector: body.connector || target.connector,
          note: body.note || target.note,
          ownerId: target.ownerId,
        }
        setStorage(
          JSON.stringify(
            data.map((battery) =>
              battery.id === id ? updatedBattery : battery,
            ),
          ),
        )
        return HttpResponse.json({ user: updatedBattery })
      })
    },
  ),

  // idで指定されたバッテリーを削除
  http.delete<{ id: string }>(endpoint('battery', ':id'), ({ params }) => {
    const { id } = params
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ error: 'Battery Not Found' }, { status: 404 })
    }

    const data = parseStorage(storage)
    const target = data.find((battery) => battery.id === id)
    if (target === undefined) {
      return HttpResponse.json({ error: 'Battery Not Found' }, { status: 404 })
    }

    setStorage(JSON.stringify(data.filter((battery) => battery.id !== id)))
    return HttpResponse.json({ battery: target })
  }),
]
