import React, { useState } from 'react'
import { Flex } from './Flex'
import { Box, Button, Typography } from '@material-ui/core'

export const Question = ({ disabled, question, onClick }) => {
  const [revealed, setRevealed] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(false)
  if (!question) return null
  const { label, answers = [], level, correctAnswer } = question

  return (
    <Flex variant="column center">
      <Flex flex={0} variant="column justify-between">
        <Typography
          style={{ textAlign: 'center', maxWidth: 600, marginBottom: 64 }}
        >
          {label} ({level})
        </Typography>

        <Flex variant="column align-center justify-end">
          {answers.length === 0 ? (
            <>
              {revealed ? (
                <>
                  <Typography style={{ marginBottom: 16 }}>
                    {correctAnswer}
                  </Typography>

                  <Box style={{ display: 'flex' }}>
                    <AnswerButton
                      disabled={disabled}
                      onClick={() => onClick(true)}
                    >
                      Correct
                    </AnswerButton>

                    <Box mx={1} />

                    <AnswerButton
                      disabled={disabled}
                      onClick={() => onClick(false)}
                    >
                      Incorrect
                    </AnswerButton>
                  </Box>
                </>
              ) : (
                <>
                  <Typography style={{ marginBottom: 16 }}>
                    State your answer to the group before revealing!
                  </Typography>
                  <AnswerButton
                    disabled={disabled}
                    onClick={() => setRevealed(true)}
                  >
                    Reveal
                  </AnswerButton>
                </>
              )}
            </>
          ) : (
            <>
              <Typography
                style={{
                  color: selectedAnswer === correctAnswer ? 'green' : 'red',
                  marginBottom: 16,
                }}
              >
                {revealed
                  ? selectedAnswer === correctAnswer
                    ? 'Correct!'
                    : 'Incorrect!'
                  : ''}
              </Typography>
              {answers.map((answer) => (
                <AnswerButton
                  key={answer}
                  disabled={disabled}
                  active={revealed && answer === correctAnswer}
                  onClick={() => {
                    setSelectedAnswer(answer)
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
