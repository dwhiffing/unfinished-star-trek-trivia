import { type, Schema, ArraySchema } from '@colyseus/schema'
import { Player } from './Player'
import { Question } from './Question'

export class RoomState extends Schema {
  @type([Player])
  players = new ArraySchema<Player>()

  @type('number')
  turnIndex = -1

  @type('number')
  phaseIndex = -1

  @type([Question])
  questions = new ArraySchema<Question>()

  @type(Question)
  activeQuestion

  constructor() {
    super()
  }
}
