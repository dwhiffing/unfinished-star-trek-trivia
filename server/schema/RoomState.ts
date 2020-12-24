import { type, Schema, ArraySchema } from '@colyseus/schema'
import { Player } from './Player'
import { Card } from './Card'

export class RoomState extends Schema {
  @type([Player])
  players = new ArraySchema<Player>()

  @type('number')
  turnIndex = -1

  @type('number')
  phaseIndex = -1

  @type([Card])
  cards = new ArraySchema<Card>()

  constructor() {
    super()
  }
}
