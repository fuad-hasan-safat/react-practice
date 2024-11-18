import React, { useRef } from 'react'

export default function Answers({
  answers, 
  selectedAnswer, 
  answerState, 
  onSelect,

}) {

  const shuffledAnswers = useRef();

  if(!shuffledAnswers.current){
    shuffledAnswers.current = answers.sort(() => Math.random() - 0.5);

  }
  return (
    <ul id='answers'>
    {shuffledAnswers.current.map((answer) => {
      const isSelected = answer === selectedAnswer;
      let cssClasses = '';

      if(answerState === 'answered' && isSelected) {
        cssClasses = 'selected';
      }
      if((answerState === 'wrong' || answerState === 'correct') && isSelected) {
        cssClasses = answerState;
      } 
      
      
      
      return (
      <li key={answer} className='answer'>
        <button onClick={() => onSelect(answer)} className={cssClasses}>
          {answer}
        </button>
      </li>
    )})}
  </ul>
  )
}
