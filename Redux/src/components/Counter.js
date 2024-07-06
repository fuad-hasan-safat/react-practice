import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {

  const dispatch = useDispatch()
  const counter = useSelector(state=> state.counter)
  const showCounter = useSelector(state=>state.showCounter)

  const toggleCounterHandler = () => {
    dispatch({
      type: 'toggle'
    })
  };

  function handleIncrement(){
    dispatch({
      type: 'increment'
    })
  }

  function handleDecrement(){
    dispatch({
      type: 'decrement'
    })
  }

  function handleIncrease(){
    dispatch({
      type: 'increase',
      amount: 5
    })
  }


  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
     {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleIncrease}>Increase by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
