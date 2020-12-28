import React, { useEffect, useState } from 'react'
import { Flex } from '../components/Flex'
import { useRoomState } from '../utils/useRoomState'
import { Actions } from '../components/Actions'
import { Header } from '../components/Header'
import { Box, ButtonBase, Typography } from '@material-ui/core'
import planet1 from '../images/planet1.png'
import planet2 from '../images/planet2.png'
import planet3 from '../images/planet3.png'
import ship from '../images/ship1.png'
import { Question } from '../components/Question'

export function OnlineRoom({ room, setRoom }) {
  const state = useRoomState({ room, setRoom })

  if (!room) return null

  return (
    <Flex
      className="container"
      variant="column"
      style={{ background: 'black', height: '100vh' }}
    >
      <Header {...state} />

      <Flex
        variant="column"
        style={{ overflow: 'scroll', position: 'relative' }}
      >
        {state.phaseIndex === -1 && <PreGame {...state} />}
        {state.phaseIndex === 0 && <Rows {...state} />}
        {state.phaseIndex === 1 && (
          <Question
            disabled={state.turnIndex !== state.clientPlayer.index}
            question={state.activeQuestion}
            onClick={state.onAnswer}
          />
        )}
      </Flex>

      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Actions {...state} />
      </Box>
    </Flex>
  )
}

const PreGame = (props) => (
  <Flex variant="column center">
    <Box mb={6}>
      <Typography variant="h5">Players:</Typography>

      <Flex flex={0} variant="column center">
        {props.players.map((p) => (
          <Typography key={p.name}>{p.name}</Typography>
        ))}
      </Flex>
    </Box>

    <Typography>Waiting for game to start</Typography>
  </Flex>
)

const Rows = (state) => (
  <Box>
    <Players {...state} />
    {state.rows.map((row, rowIndex) => (
      <Flex
        key={rowIndex}
        variant="justify-evenly"
        style={{ margin: '80px 20px' }}
      >
        {row.map((node, index) => (
          <Node
            key={index}
            onClick={state.onMove}
            {...node}
            isHighlighted={
              state.turnIndex === state.clientPlayer.index &&
              (node.y === state.clientPlayer.y ||
                node.y === state.clientPlayer.y - 1 ||
                node.y === state.clientPlayer.y + 1)
            }
          />
        ))}
      </Flex>
    ))}
  </Box>
)

const Players = ({ players = [], clientPlayer }) => (
  <Box
    style={{
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2,
    }}
  >
    {players.map((player) => (
      <Player key={player.name} player={player} clientPlayer={clientPlayer} />
    ))}
  </Box>
)

const Player = ({ player, clientPlayer }) => {
  const [state, setState] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setState(1)
    }, 500)

    setTimeout(() => {
      setState(2)
    }, 1000)
  }, [])

  const node = document.querySelector(`.node-${player.x}-${player.y}`)
  const x = node ? node.offsetLeft : -1
  const y = node ? node.offsetTop : -1

  return (
    <div
      key={player.name}
      style={{
        position: 'absolute',
        transform: state >= 1 ? `translate(${x}px, ${y}px) scaleY(-1)` : null,
        transition: state === 2 ? 'transform 1400ms ease-in-out' : null,
        opacity: state >= 1 ? 1 : 0,
        width: 55,
        height: 55,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        borderRadius: 50,
        backgroundColor:
          player.id === clientPlayer.id
            ? 'rgba(255,255,255,0.5)'
            : 'rgba(255,255,255,0)',
      }}
    >
      <img src={ship} alt="planet" style={{ width: 30, height: 30 }} />
    </div>
  )
}

const Node = ({ type, onClick, x, y, isHighlighted }) => (
  <ButtonBase
    onClick={() => onClick(x, y)}
    className={`node-${x}-${y}`}
    style={{
      borderRadius: 50,
      boxSizing: 'border-box',
      border: '2px solid white',
      borderColor: isHighlighted && type > -1 ? 'white' : 'black',
    }}
  >
    {PLANETS[type] && (
      <img
        src={PLANETS[type]}
        alt="planet"
        style={{ width: 100, height: 100 }}
      />
    )}
  </ButtonBase>
)

const PLANETS = [planet1, planet2, planet3]
