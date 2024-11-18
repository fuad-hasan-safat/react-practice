import React from 'react'
import QuestionTimmer from './QuestionTimmer'
import Answers from './Answers'

export default function Question({
    questionText,
    answers,
    onSelect,
    selectedAnswer,
    answerState,
    handleSkipAnswer
}) {
    return (
        <div id='question'>

            <QuestionTimmer
                timeout={10 * 1000}
                onTimeout={handleSkipAnswer} />

            <h2>{questionText}</h2>

            <Answers
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelect} />

        </div>
    )
}
