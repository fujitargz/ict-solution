import {
  Button,
  NativeSelect,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSession, checkSessionManually } from '../../hooks/useSession'
import { setSessionManually } from '../../hooks/useSetSession'
import { endpoint } from '../../mocks/handlers'
import { useState } from 'react'

export const Register = () => {
  const [session] = useSession()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [connector, setConnector] = useState('')
  const [note, setNote] = useState('')
  const [err, setErr] = useState('')

  if (!session?.isLoggedIn) {
    const checkedSession = checkSessionManually()
    if (checkedSession.isLoggedIn) {
      setSessionManually(checkedSession)
      return <></>
    } else {
      return <Navigate to="/login" />
    }
  }

  const handleRegisterButtonClick = () => {
    fetch(endpoint('battery'), {
      method: 'POST',
      body: JSON.stringify({
        name,
        connector,
        note,
        ownerId: session.currentUser.id,
      }),
    }).then((res) => {
      res.ok ? navigate('/rentto') : setErr('登録失敗')
    })
  }

  return (
    <Stack>
      <TextInput
        label="バッテリー製品名"
        placeholder="Anker magnetic 722"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <NativeSelect
        label="対応ケーブル"
        data={['lightning', 'USB-C', 'USB-A']}
        onChange={(e) => setConnector(e.currentTarget.value)}
      />
      <Textarea
        label="追加情報"
        placeholder="特記事項があれば入力"
        value={note}
        onChange={(e) => setNote(e.currentTarget.value)}
      />
      <Button onClick={handleRegisterButtonClick}>登録する</Button>
      {err || <Text>{err}</Text>}
    </Stack>
  )
}
