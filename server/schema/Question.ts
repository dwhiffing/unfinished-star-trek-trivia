import { type, Schema } from '@colyseus/schema'

export class Question extends Schema {
  reconnection: any

  @type('string')
  level = ''

  @type('string')
  label = ''

  @type(['string'])
  answers = []

  @type('string')
  correctAnswer = ''

  constructor({ label, level, correctAnswer, answers = [] }) {
    super()
    this.label = label
    this.answers = answers
    this.level = `${level}`
    this.correctAnswer = correctAnswer
  }
}
