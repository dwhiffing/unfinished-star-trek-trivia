import { Command } from '@colyseus/command'
import { QUESTIONS } from '../../lib/trivia'
import { RoomState } from '../schema'
import { Question } from '../schema/Question'
import shuffle from 'lodash/shuffle'

export class MoveCommand extends Command<
  RoomState,
  { playerId: string; x: number; y: number }
> {
  validate({ playerId, x, y }) {
    if (this.state.phaseIndex === -1) return false

    const player = this.state.players.find((p) => p.id === playerId)
    if (this.state.turnIndex !== player.index) return false

    const playerOnNode = this.state.players.find((p) => p.x === x && p.y === y)
    if (playerOnNode) return false

    return y === player.y - 1 || y === player.y || y === player.y + 1
  }

  execute({ playerId, x, y }) {
    const player = this.state.players.find((p) => p.id === playerId)

    player.x = x
    player.y = y
    this.state.activeQuestion = new Question(shuffle(QUESTIONS)[0])
    this.state.phaseIndex++
  }
}
