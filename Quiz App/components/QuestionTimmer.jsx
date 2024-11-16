import React, { useEffect, useState } from 'react'

export default function QuestionTimmer({ timeout, onTimeout }) {

   const [remainingTime, setRemainingTime] = useState(timeout);

   useEffect(() => {
   const timer =setTimeout(onTimeout, timeout);

   return () => clearTimeout(timer);
       
   }, [timeout, onTimeout]);

   useEffect(() => {
    const intervel = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => clearInterval(intervel);
   },[])
  
    return (
        <progress value={remainingTime} max={timeout} id='question-time' />
    )
}
