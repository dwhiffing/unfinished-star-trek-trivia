import React, { useState } from 'react'
import { Flex } from './Flex'
import { Button, Typography } from '@material-ui/core'

export const Question = ({ disabled, question, onClick }) => {
  const [revealed, setRevealed] = useState(false)
  if (!question) return null
  const { label, answers = [], level, correctAnswer } = question

  return (
    <Flex variant="column center">
      <Flex
        flex={0}
        variant="column justify-between"
        style={{ minHeight: 250 }}
      >
        <Typography style={{ textAlign: 'center', maxWidth: 600 }}>
          {label} ({level})
        </Typography>

        <Flex variant="column align-center justify-end">
          {answers.length === 0 ? (
            <>
              {revealed ? (
                <>
                  <Typography>{correctAnswer}</Typography>

                  <AnswerButton
                    disabled={disabled}
                    onClick={() => onClick(true)}
                  >
                    Correct
                  </AnswerButton>
                  <AnswerButton
                    disabled={disabled}
                    onClick={() => onClick(false)}
                  >
                    Incorrect
                  </AnswerButton>
                </>
              ) : (
                <AnswerButton
                  disabled={disabled}
                  onClick={() => setRevealed(true)}
                >
                  Reveal
                </AnswerButton>
              )}
            </>
          ) : (
            <>
              {answers.map((answer) => (
                <AnswerButton
                  key={answer}
                  disabled={disabled}
                  active={revealed && answer === correctAnswer}
                  onClick={() => {
                    onClick(answer)
                    setRevealed(true)
                  }}
                >
                  {answer}
                </AnswerButton>
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

const AnswerButton = ({ onClick, children, active, ...props }) => (
  <Button
    {...props}
    onClick={onClick}
    style={{
      marginBottom: 8,
      color: active ? '#222' : 'white',
      backgroundColor: active ? 'white' : '#222',
    }}
  >
    {children}
  </Button>
)
