import React, { useState } from 'react'
import QuestionTimmer from './QuestionTimmer'
import Answers from './Answers'
import QUESTIONS from '../src/questions';

export default function Question({
    key,
    questionText,
    answers,
    onSelect,
    selectedAnswer,
    handleSkipAnswer
}) {

    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null,
    })

    function handleSelectAnswer(answer){
        setAnswer(({
            selectedAnswer: answer,
            isCorrect: null
        }))


        setTimeout(()=>{
            setAnswer(({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[key].answers[0] === answer
            }))
        }, 1000)
    }

    let answerState = '';
    if(answer.selectedAnswer){
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    }

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
                onSelect={handleSelectAnswer}
                 />
        </div>
    )
}
