import { http, HttpResponse, PathParams } from 'msw'
import { accessLocalStorage, endpoint, Battery, Rental, User } from './helper'

const [getStorage, setStorage, parseStorage] = accessLocalStorage<Rental>(
  'ict-solution-rental',
)

const [getUserStorage, , parseUserStorage] =
  accessLocalStorage<User>('ict-solution-user')

const [getBatteryStorage, , parseBatteryStorage] = accessLocalStorage<Battery>(
  'ict-solution-battery',
)

export const rentalHandlers = [
  // 全レンタル情報を取得
  http.get(endpoint('rental'), () => {
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ rentals: [] })
    }

    return HttpResponse.json({ rentals: parseStorage(storage) })
  }),

  // 募集中のレンタル情報を取得
  http.get(endpoint('rental', 'available'), () => {
    const storage = getStorage()
    if (storage === null) {
      return HttpResponse.json({ rentals: [] })
    }
    const rentals = parseStorage(storage)

    const userStorage = getUserStorage()
    if (userStorage === null) {
      return HttpResponse.json({ rentals: [] })
    }
    const users = parseUserStorage(userStorage)

    const batteryStorage = getBatteryStorage()
    if (batteryStorage === null) {
      return HttpResponse.json({ rentals: [] })
    }
    const batteries = parseBatteryStorage(batteryStorage)
    const availableRentals = rentals
      .filter(({ status }) => status === 'available')
      .map((rental) => {
        const battery = batteries.find(({ id }) => id === rental.batteryId)
        const owner = users.find(({ id }) => id === battery?.ownerId)
        return { rental, battery, owner }
      })

    return HttpResponse.json({ rentals: availableRentals })
  }),

  // userIdで指定されたユーザがリクエスト中のレンタル情報を取得（承認済みも含む）
  http.get<{ userId: string }>(
    endpoint('rental', 'request', ':userId'),
    ({ params }) => {
      const { userId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)
      const targetRental = rentals
        .filter(({ status }) => status === 'reserved' || status === 'approved')
        .find(({ borrowerId }) => borrowerId === userId)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const targetBattery = batteries.find(
        ({ id }) => id === targetRental.batteryId,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const targetOwner = users.find(({ id }) => id === targetBattery.ownerId)

      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({
        rental: {
          rental: targetRental,
          battery: targetBattery,
          owner: targetOwner,
        },
      })
    },
  ),

  // userIdで指定されたユーザがリクエストされているレンタル情報を取得
  http.get<{ userId: string }>(
    endpoint('rental', 'requested', ':userId'),
    ({ params }) => {
      const { userId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)

      const targetOwner = users.find(({ id }) => id === userId)
      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBattery = batteries.find(
        ({ ownerId }) => ownerId === targetOwner.id,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetRental = rentals
        .filter(({ status }) => status === 'reserved')
        .find(({ batteryId }) => batteryId === targetBattery.id)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBorrower = users.find(
        ({ id }) => id === targetRental.borrowerId,
      )
      if (targetBorrower === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({
        rental: {
          rental: targetRental,
          battery: targetBattery,
          owner: targetOwner,
          borrower: targetBorrower,
        },
      })
    },
  ),

  // userIdで指定されたユーザがリクエスト承認したレンタル情報を取得
  http.get<{ userId: string }>(
    endpoint('rental', 'approved', ':userId'),
    ({ params }) => {
      const { userId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)

      const targetOwner = users.find(({ id }) => id === userId)
      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBattery = batteries.find(
        ({ ownerId }) => ownerId === targetOwner.id,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetRental = rentals
        .filter(({ status }) => status === 'approved')
        .find(({ batteryId }) => batteryId === targetBattery.id)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBorrower = users.find(
        ({ id }) => id === targetRental.borrowerId,
      )
      if (targetBorrower === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({
        rental: {
          rental: targetRental,
          battery: targetBattery,
          owner: targetOwner,
          borrower: targetBorrower,
        },
      })
    },
  ),

  // userIdで指定されたユーザが貸し出し開始したレンタル情報を取得
  http.get<{ userId: string }>(
    endpoint('rental', 'started', ':userId'),
    ({ params }) => {
      const { userId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)

      const targetOwner = users.find(({ id }) => id === userId)
      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBattery = batteries.find(
        ({ ownerId }) => ownerId === targetOwner.id,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetRental = rentals
        .filter(({ status }) => status === 'started')
        .find(({ batteryId }) => batteryId === targetBattery.id)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBorrower = users.find(
        ({ id }) => id === targetRental.borrowerId,
      )
      if (targetBorrower === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({
        rental: {
          rental: targetRental,
          battery: targetBattery,
          owner: targetOwner,
          borrower: targetBorrower,
        },
      })
    },
  ),

  // userIdで指定されたユーザが借用中のレンタル情報を取得
  http.get<{ userId: string }>(
    endpoint('rental', 'borrowing', ':userId'),
    ({ params }) => {
      const { userId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)

      const targetRental = rentals
        .filter(({ status }) => status === 'started')
        .find(({ borrowerId }) => borrowerId === userId)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBattery = batteries.find(
        ({ id }) => id === targetRental.batteryId,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetOwner = users.find(({ id }) => id === targetBattery.ownerId)
      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const targetBorrower = users.find(
        ({ id }) => id === targetRental.borrowerId,
      )
      if (targetBorrower === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({
        rental: {
          rental: targetRental,
          battery: targetBattery,
          owner: targetOwner,
          borrower: targetBorrower,
        },
      })
    },
  ),

  // userIdで指定されたユーザが返却したレンタル情報を取得
  http.get<{ userId: string }>(
    endpoint('rental', 'returned', ':userId'),
    ({ params }) => {
      const { userId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)
      const targetRental = rentals
        .filter(({ status }) => status === 'returned')
        .find(({ borrowerId }) => borrowerId === userId)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const targetBattery = batteries.find(
        ({ id }) => id === targetRental.batteryId,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const targetOwner = users.find(({ id }) => id === targetBattery.ownerId)

      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      return HttpResponse.json({
        rental: {
          rental: targetRental,
          battery: targetBattery,
          owner: targetOwner,
        },
      })
    },
  ),

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

  // idで指定されたレンタル情報を関連情報まで含めて取得
  http.get<{ rentalId: string }>(
    endpoint('rental', 'detail', ':rentalId'),
    ({ params }) => {
      const { rentalId } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const rentals = parseStorage(storage)

      const userStorage = getUserStorage()
      if (userStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const users = parseUserStorage(userStorage)

      const batteryStorage = getBatteryStorage()
      if (batteryStorage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const batteries = parseBatteryStorage(batteryStorage)

      const targetRental = rentals.find((rental) => rental.id === rentalId)
      if (targetRental === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const targetBattery = batteries.find(
        (battery) => battery.id === targetRental.batteryId,
      )
      if (targetBattery === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const targetOwner = users.find(
        (user) => user.id === targetBattery.ownerId,
      )
      if (targetOwner === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }
      const target = {
        rental: targetRental,
        battery: targetBattery,
        owner: targetOwner,
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
      return request
        .clone()
        .json()
        .then((body) => {
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

  // idで指定されたレンタル情報を更新（貸し出しリクエスト承認）
  http.put<{ id: string }>(
    endpoint('rental', 'approve', ':id'),
    ({ params }) => {
      const { id } = params
      const storage = getStorage()
      if (storage === null) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const data = parseStorage(storage)
      const target = data.find(
        (rental) => rental.id === id && rental.status === 'reserved',
      )
      if (target === undefined) {
        return HttpResponse.json({ error: 'Rental Not Found' }, { status: 404 })
      }

      const updatedRental: Rental = {
        ...target,
        status: 'approved',
      }
      setStorage(
        JSON.stringify(
          data.map((rental) => (rental.id === id ? updatedRental : rental)),
        ),
      )
      return HttpResponse.json({ rental: updatedRental })
    },
  ),

  // idで指定されたレンタル情報を更新（貸し出し開始）
  http.put<{ id: string }, { otp: string }>(
    endpoint('rental', 'start', ':id'),
    ({ params, request }) => {
      const { id } = params
      return request
        .clone()
        .json()
        .then((body) => {
          const storage = getStorage()
          if (storage === null) {
            return HttpResponse.json(
              { error: 'Rental Not Found' },
              { status: 404 },
            )
          }

          const data = parseStorage(storage)
          const target = data.find(
            (rental) =>
              rental.id === id &&
              rental.status === 'approved' &&
              rental.otp === body.otp,
          )
          if (target === undefined) {
            return HttpResponse.json(
              { error: 'Rental Not Found' },
              { status: 404 },
            )
          }

          const ary = new Uint16Array(1)
          crypto.getRandomValues(ary)
          const otp = ary[0].toString().padEnd(6, '0').slice(0, 6)

          const updatedRental: Rental = {
            ...target,
            otp,
            status: 'started',
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

  // idで指定されたレンタル情報を更新（返却）
  http.put<{ id: string }, { otp: string }>(
    endpoint('rental', 'return', ':id'),
    ({ params, request }) => {
      const { id } = params
      return request
        .clone()
        .json()
        .then((body) => {
          const storage = getStorage()
          if (storage === null) {
            return HttpResponse.json(
              { error: 'Rental Not Found' },
              { status: 404 },
            )
          }

          const data = parseStorage(storage)
          const target = data.find(
            (rental) =>
              rental.id === id &&
              rental.status === 'started' &&
              rental.otp === body.otp,
          )
          if (target === undefined) {
            return HttpResponse.json(
              { error: 'Rental Not Found' },
              { status: 404 },
            )
          }

          const updatedRental: Rental = {
            ...target,
            status: 'returned',
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
