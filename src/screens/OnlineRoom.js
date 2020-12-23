import React from 'react'
import { Flex } from '../components/Flex'
import { useRoomState } from '../utils/useRoomState'
import { Actions } from '../components/Actions'
import { Header } from '../components/Header'

export function OnlineRoom({ room, setRoom }) {
  const state = useRoomState({ room, setRoom })
  if (!room) return null

  console.log(state)

  return (
    <Flex className="container" variant="column">
      <Header {...state} />

      <Actions {...state} />
    </Flex>
  )
}
