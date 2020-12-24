import { Typography } from '@material-ui/core'
import React from 'react'
import { Action } from '../components/Action'

export const Actions = (props) => (
  <>
    {props.phaseIndex === -1 && <LobbyActions {...props} />}
    {props.phaseIndex === 0 && <GameActions {...props} />}
  </>
)

const LobbyActions = (props) =>
  props.clientPlayer.isAdmin && (
    <>
      <Action disabled={props.players.length < 2} onClick={props.onStart}>
        Start
      </Action>
    </>
  )

const GameActions = (props) =>
  props.turnIndex === props.clientPlayer.index && <></>
