import React, { useCallback, useRef } from 'react'
import QUESTIONS from '../src/questions';
import QuestionTimmer from './QuestionTimmer';

export default function Quiz() {
  const shuffledAnswers = useRef();
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
  if(!shuffledAnswers.current){
    shuffledAnswers.current = QUESTIONS[activeQuestionIndex].answers.sort(() => Math.random() - 0.5);

  }


  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimmer key={activeQuestionIndex} timeout={10 * 1000} onTimeout={handleSkipAnswer} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.current.map((answer) => {
            const isSelected = answer === userAnswers[userAnswers.length - 1];
            let cssClasses = '';

            if(answerState === 'answered' && isSelected) {
              cssClasses = 'selected';
            }
            if((answerState === 'wrong' || answerState === 'correct') && isSelected) {
              cssClasses = answerState;
            } 
            
            
            
            return (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectAnswer(answer)} className={cssClasses}>
                {answer}
              </button>
            </li>
          )})}
        </ul>
      </div>
    </div>

  )
}
