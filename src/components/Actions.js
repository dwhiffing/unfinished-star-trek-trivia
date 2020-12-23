import React from 'react'
import { Action } from '../components/Action'

export const Actions = (props) => (
  <>
    {props.clientPlayer.isAdmin && (
      <>
        <Action disabled={props.players.length < 2} onClick={props.onStart}>
          Start
        </Action>
      </>
    )}
  </>
)
