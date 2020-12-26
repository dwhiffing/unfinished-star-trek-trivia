import { Command } from '@colyseus/command'
import { RoomState } from '../schema'

export class AnswerCommand extends Command<
  RoomState,
  { playerId: string; answer: string }
> {
  validate({ playerId, answer }) {
    if (this.state.phaseIndex !== 1) return false

    const player = this.state.players.find((p) => p.id === playerId)
    if (this.state.turnIndex === player.index) return false

    return true
  }

  execute({ playerId, answer }) {
    console.log({ playerId, answer })
    const player = this.state.players.find((p) => p.id === playerId)
    if (
      answer === false ||
      this.state.activeQuestion.correctAnswer !== answer
    ) {
      this.clock.setTimeout(() => {
        this.state.phaseIndex = 0
        this.state.activeQuestion = null
        this.state.turnIndex++

        if (this.state.turnIndex > this.state.players.length - 1) {
          this.state.turnIndex = 0
        }
      }, 3000)
    } else {
      player.score++
      this.clock.setTimeout(() => {
        this.state.phaseIndex = 0
        this.state.activeQuestion = null
      }, 3000)
    }
  }
}
