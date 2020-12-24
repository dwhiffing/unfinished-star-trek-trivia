import { type, Schema } from '@colyseus/schema'

export class Question extends Schema {
  reconnection: any

  @type('string')
  label = ''

  @type(['string'])
  answers = []

  @type('string')
  correctAnswer = ''

  constructor({ label, correctAnswer, answers = [] }) {
    super()
    this.label = label
    this.answers = answers
    this.correctAnswer = correctAnswer
  }
}
