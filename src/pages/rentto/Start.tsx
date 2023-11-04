import { Button, Space, Stack, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useNavigate } from 'react-router-dom'
import { useSession, checkSessionManually } from '../../hooks/useSession'
import { setSessionManually } from '../../hooks/useSetSession'
import { endpoint, Battery } from '../../mocks/handlers'
import { useEffect, useState } from 'react'
import { Map } from '../../components/Map'

export const Start = () => {
  const [session] = useSession()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [due, setDue] = useState(new Date())
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [complete, setComplete] = useState(false)

  const handleGetCurrentLocationClick = () => {
    const defaultLat = 36.57332723779
    const defaultLng = 140.64191798417
    if (lat === 0 || lng === 0) {
      setLat(defaultLat)
      setLng(defaultLng)
    } else {
      const seed = new Uint8Array(2)
      crypto.getRandomValues(seed)
      setLat(defaultLat + (seed[0] % 1000) / 10000 - 0.005)
      setLng(defaultLng - (seed[1] % 1000) / 10000)
    }
  }

  const handleStartRentClick = async () => {
    if (!session?.isLoggedIn) {
      return navigate('/login')
    }

    fetch(endpoint('battery', 'owner', session.currentUser.id))
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then((body) => (body.battery as Battery).id)
      .then((batteryId) =>
        fetch(endpoint('rental'), {
          method: 'POST',
          body: JSON.stringify({ batteryId, due: due.toISOString(), lat, lng }),
        }),
      )
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return setComplete(true)
      })
      .catch(() => navigate('/rentto'))
  }

  useEffect(() => {
    if (!session?.isLoggedIn) {
      const checkedSession = checkSessionManually()
      if (checkedSession.isLoggedIn) {
        setSessionManually(checkedSession)
        return
      } else {
        return navigate('/login')
      }
    }

    fetch(endpoint('battery', 'owner', session.currentUser.id))
      .then((res) => {
        if (!res.ok) {
          throw new Error()
        }
        return res.json()
      })
      .then((body) => {
        setName((body.battery as Battery).name)
      })
      .catch(() => navigate('/rentto'))
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack>
      <TextInput
        disabled={complete}
        label="バッテリー製品名"
        placeholder="Anker magnetic 722"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <DateTimePicker
        disabled={complete}
        label="時間"
        placeholder="貸し出し終了時刻を指定"
        valueFormat="YYYY/MM/DD HH:mm"
        value={due}
        onChange={(e) => e !== null && setDue(e)}
      />
      <Map lat={lat} lng={lng} />
      <Button disabled={complete} onClick={handleGetCurrentLocationClick}>
        現在地を取得する
      </Button>
      <Space />
      {complete ? (
        <Button color="green">募集中</Button>
      ) : (
        <Button
          disabled={lat === 0 || lng === 0}
          onClick={handleStartRentClick}
        >
          募集を開始する
        </Button>
      )}
    </Stack>
  )
}
