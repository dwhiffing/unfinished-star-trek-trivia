import { Command } from '@colyseus/command'
import { RoomState } from '../schema'

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

    this.state.turnIndex++

    if (this.state.turnIndex > this.state.players.length - 1) {
      this.state.turnIndex = 0
    }

    player.x = x
    player.y = y
  }
}
