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

export class Card extends Schema {
  reconnection: any

  @type('number')
  id

  @type([Question])
  questions = []

  constructor({ id, questions }) {
    super()
    this.id = id
    this.questions = questions
  }
}
