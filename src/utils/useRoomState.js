import { useEffect, useState } from 'react'

const rows = [
  [{ type: -1 }, { type: -1 }, { type: -1 }],
  [{ type: 0 }, { type: 1 }, { type: 1 }],
  [{ type: 2 }, { type: 0 }],
  [{ type: 0 }, { type: 1 }, { type: 0 }, { type: 2 }],
  [{ type: 0 }, { type: 1 }, { type: 2 }],
  [{ type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }],
  [{ type: 0 }, { type: 2 }, { type: 0 }],
].map((row, y) => row.map((node, x) => ({ ...node, x, y })))

export const useRoomState = ({ room, setRoom }) => {
  const [serverState, setServerState] = useState(room.state.toJSON())

  useEffect(() => {
    if (!room) return
    setServerState(room.state.toJSON())
    room.onStateChange((state) => {
      setServerState(state.toJSON())
    })

    room.onLeave((code) => {
      if (code === 1000) localStorage.removeItem(room.id)
      setServerState({})
      setRoom()
    })
  }, [room, setRoom])

  const clientPlayer =
    (serverState.players || []).find((p) => p.id === room.sessionId) || {}

  const onLeave = () => room.leave()
  const onStart = () => room.send('Start')
  const onMove = (x, y) => room.send('Move', { x, y })
  const onAnswer = (answer) => room.send('Answer', { answer })
  const onKick = (player) => room.send('Leave', { playerId: player.id })

  return {
    ...serverState,
    rows,
    room,
    clientPlayer,
    onLeave,
    onKick,
    onStart,
    onMove,
    onAnswer,
  }
}
