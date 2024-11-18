import React, { useCallback } from 'react'
import QUESTIONS from '../src/questions';
import QuestionTimmer from './QuestionTimmer';
import Answers from './Answers';
import Question from './Question';

export default function Quiz() {
  
  const [answerState, setAnswerState] = React.useState('');
  const [userAnswers, setUserAnswers] = React.useState([]);
  const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizComplete = userAnswers.length === QUESTIONS.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    setAnswerState('answered');
    setUserAnswers([...userAnswers, selectedAnswer]);

    setTimeout(() => {
      
      if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
        setAnswerState('correct');
      } else {
        setAnswerState('wrong');
      }

      setTimeout(() => {
        setAnswerState('');
      }, 2000)

    }, 1000);
  }, [activeQuestionIndex])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  if (quizComplete) {
    return (
      <div id='summary'>
        <img src='/quiz-complete.png' alt='Quiz Complete' />
        <h2>Quiz Complete!</h2>
      </div>
    )
  }

  return (
    <div id='quiz'>
     <Question 
     key={activeQuestionIndex}
     questionText={QUESTIONS[activeQuestionIndex].text}
     answers={QUESTIONS[activeQuestionIndex].answers}
     selectedAnswer={userAnswers[userAnswers.length - 1]}
     answerState={answerState}
     onSelect={handleSelectAnswer}
     handleSkipAnswer={handleSkipAnswer}
     />
    </div>

  )
}
