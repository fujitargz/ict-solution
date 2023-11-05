import { http, HttpResponse, PathParams } from 'msw'
import { accessLocalStorage, endpoint, Rental } from './helper'

const [getStorage, setStorage, parseStorage] = accessLocalStorage<Rental>(
  'ict-solution-rental',
)

export const rentalHandlers = [
  // 全レンタル情報を取得
  http.get(endpoint('rental'), () => {
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ rentals: [] })
    }

    return HttpResponse.json({ rentals: JSON.parse(storage) })
  }),

  // idで指定されたレンタル情報を取得
  http.get<{ id: string }>(endpoint('rental', ':id'), ({ params }) => {
    const { id } = params
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
    }

    const data = parseStorage(storage)
    const target = data.find((rental) => rental.id === id)
    if (target === undefined) {
      return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
    }

    return HttpResponse.json({ rental: target })
  }),

  // batteryIdで指定されたレンタル情報を取得
  http.get<{ batteryId: string }>(
    endpoint('rental', 'battery', ':batteryId'),
    ({ params }) => {
      const { batteryId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const data = parseStorage(storage)
      const target = data.find((rental) => rental.batteryId === batteryId)
      if (target === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({ rental: target })
    },
  ),

  // レンタル情報を作成
  http.post<
    PathParams,
    {
      batteryId: string
      due: string
      lat: string
      lng: string
    }
  >(endpoint('rental'), ({ request }) =>
    request
      .clone()
      .json()
      .then((body) => {
        const ary = new Uint16Array(1)
        crypto.getRandomValues(ary)
        const otp = ary[0].toString().padEnd(6, '0').slice(0, 6)
        const newRental: Rental = {
          id: crypto.randomUUID(),
          borrowerId: '',
          status: 'available',
          otp,
          ...body,
        }
        const storage = getStorage()
        if (storage === null) {
          setStorage(JSON.stringify([newRental]))
          return HttpResponse.json({ rental: newRental }, { status: 201 })
        }

        const data = parseStorage(storage)

        if (data.some(({ batteryId }) => batteryId === body.batteryId)) {
          return HttpResponse.json({ error: 'Bad Request' }, { status: 400 })
        }

        setStorage(JSON.stringify([...data, newRental]))
        return HttpResponse.json({ rental: newRental }, { status: 201 })
      }),
  ),

  // idで指定されたレンタル情報を更新（貸し出しリクエスト）
  http.put<{ id: string }, { borrowerId: string }>(
    endpoint('rental', 'reserve', ':id'),
    ({ params, request }) => {
      const { id } = params
      request.json().then((body) => {
        const storage = getStorage()
        if (storage === null) {
          return HttpResponse.json(
            { error: 'Rental Not Found' },
            { status: 404 },
          )
        }

        const data = parseStorage(storage)
        const target = data.find(
          (rental) => rental.id === id && rental.status === 'available',
        )
        if (target === undefined) {
          return HttpResponse.json(
            { error: 'Rental Not Found' },
            { status: 404 },
          )
        }

        const updatedRental: Rental = {
          ...target,
          borrowerId: body.borrowerId,
          status: 'reserved',
        }
        setStorage(
          JSON.stringify(
            data.map((rental) => (rental.id === id ? updatedRental : rental)),
          ),
        )
        return HttpResponse.json({ rental: updatedRental })
      })
    },
  ),

  // idで指定されたレンタル情報を削除
  http.delete<{ id: string }>(endpoint('rental', ':id'), ({ params }) => {
    const { id } = params
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
    }

    const data = parseStorage(storage)
    const target = data.find((rental) => rental.id === id)
    if (target === undefined) {
      return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
    }

    setStorage(JSON.stringify(data.filter((rental) => rental.id !== id)))
    return HttpResponse.json({ rental: target })
  }),
]
