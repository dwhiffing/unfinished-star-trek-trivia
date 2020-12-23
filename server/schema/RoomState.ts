import { type, Schema, ArraySchema } from '@colyseus/schema'
import { Player } from './Player'
import { Card } from './Card'

export class RoomState extends Schema {
  @type([Player])
  players = new ArraySchema<Player>()

  @type([Card])
  cards = new ArraySchema<Card>()

  constructor() {
    super()
  }
}
