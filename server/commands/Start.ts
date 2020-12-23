import { Command } from '@colyseus/command'
import { RoomState } from '../schema'
import { CARDS } from '../../lib/trivia'
import { ArraySchema } from '@colyseus/schema'
import { Card, Question } from '../schema/Card'

export class StartCommand extends Command<RoomState, { playerId: string }> {
  execute({ playerId }) {
    this.state.cards = new ArraySchema<Card>(
      ...CARDS.map(
        (c) =>
          new Card({
            id: c.id,
            questions: c.questions.map((q) => new Question(q)),
          }),
      ),
    )
  }
}
