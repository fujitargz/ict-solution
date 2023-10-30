import { Button, Stack, TextInput } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useSession, checkSessionManually } from '../../hooks/useSession'
import { setSessionManually } from '../../hooks/useSetSession'
import { endpoint, Battery } from '../../mocks/handlers'
import { useEffect, useState } from 'react'
import { Map } from '../../components/Frame/Map'

export const Start = () => {
  const [session] = useSession()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [lat] = useState(36.57332723779)
  const [lng] = useState(140.64191798417)

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
        const { name } = body as Battery
        setName(name)
      })
      .catch(() => navigate('/battery/register'))
  }, [])

  return (
    <Stack>
      <TextInput
        label="バッテリー製品名"
        placeholder="Anker magnetic 722"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Map lat={lat} lng={lng} />
      <Button disabled>登録する</Button>
    </Stack>
  )
}
