import { Command } from '@colyseus/command'
import { RoomState } from '../schema'
import { QUESTIONS } from '../../lib/trivia'
import { ArraySchema } from '@colyseus/schema'
import { Question } from '../schema/Question'

export class StartCommand extends Command<RoomState, { playerId: string }> {
  execute({ playerId }) {
    this.state.phaseIndex = 0
    this.state.turnIndex = 0
    this.state.questions = new ArraySchema<Question>(
      ...QUESTIONS.map((q) => new Question(q)),
    )
  }
}
