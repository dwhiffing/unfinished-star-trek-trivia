import { type, Schema } from '@colyseus/schema'

export class Player extends Schema {
  reconnection: any

  @type('string')
  id = ''

  @type('string')
  name = ''

  @type('number')
  index = -1

  @type('number')
  x = 0

  @type('number')
  y = 0

  @type('number')
  score = 0

  @type('boolean')
  connected = true

  @type('boolean')
  isAdmin = false

  @type('number')
  remainingConnectionTime = 0

  constructor(id: string, index, y) {
    super()
    this.id = id
    this.index = index
    this.x = index
    this.y = y
  }
}
