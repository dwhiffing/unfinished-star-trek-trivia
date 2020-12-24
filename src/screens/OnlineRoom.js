import React from 'react'
import { Flex } from '../components/Flex'
import { useRoomState } from '../utils/useRoomState'
import { Actions } from '../components/Actions'
import { Header } from '../components/Header'
import { Button, ButtonBase, Typography } from '@material-ui/core'
import planet1 from '../images/planet1.png'
import planet2 from '../images/planet2.png'
import planet3 from '../images/planet3.png'
import ship from '../images/ship1.png'

const rows = [
  [{ type: -1 }, { type: -1 }, { type: -1 }],
  [{ type: 0 }, { type: 1 }, { type: 1 }],
  [{ type: 2 }, { type: 0 }],
  [{ type: 0 }, { type: 1 }, { type: 0 }, { type: 2 }],
  [{ type: 0 }, { type: 1 }, { type: 2 }],
  [{ type: 0 }, { type: 2 }, { type: 0 }, { type: 0 }],
  [{ type: 0 }, { type: 2 }, { type: 0 }],
]
  .map((row, y) => row.map((node, x) => ({ ...node, x, y })))
  .reverse()

export function OnlineRoom({ room, setRoom }) {
  const state = useRoomState({ room, setRoom })
  if (!room) return null

  // const card = state.cards ? state.cards[0] : null

  return (
    <Flex className="container" variant="column">
      <Header {...state} />

      {state.phaseIndex > -1 && <Rows rows={rows} {...state} />}
      {state.phaseIndex > -1 && <Players {...state} />}

      {/* <Question card={card} questionIndex={2} /> */}

      <Actions {...state} />
    </Flex>
  )
}

const Rows = ({ rows, onMove, turnIndex, clientPlayer }) =>
  rows.map((row) => (
    <Flex variant="justify-evenly" style={{ margin: '80px 20px' }}>
      {row.map((node) => (
        <Node
          onClick={onMove}
          {...node}
          isHighlighted={
            turnIndex === clientPlayer.index &&
            (node.y === clientPlayer.y ||
              node.y === clientPlayer.y - 1 ||
              node.y === clientPlayer.y + 1)
          }
        />
      ))}
    </Flex>
  ))

const Players = ({ players = [], clientPlayer }) => {
  return players.map((player) => {
    const node = document.querySelector(`.node-${player.x}-${player.y}`)
    if (!node) return null

    const x = node.offsetLeft
    const y = node.offsetTop

    return (
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            transform: `translate(${x - 30}px, ${y - 30}px)`,
            transition: 'transform 2000ms',
            transitionTimingFunction: 'ease-in-out',
            width: 55,
            height: 55,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            borderColor: player.id === clientPlayer.id ? 'white' : 'black',
            border: '1px solid white',
            borderRadius: 50,
          }}
        >
          <img src={ship} alt="planet" style={{ width: 30, height: 30 }} />
        </div>
      </div>
    )
  })
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

const Question = ({ card, questionIndex = 0 }) => {
  if (!card) return null
  const { label, answers, correctAnswer } = card.questions[questionIndex]
  return (
    <Flex variant="column">
      <Typography>{label}</Typography>
      {answers.map((answer) => (
        <Button onClick={() => console.log(answer === correctAnswer)}>
          {answer}
        </Button>
      ))}
    </Flex>
  )
}
