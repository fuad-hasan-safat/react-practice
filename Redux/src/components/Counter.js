import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter-slice';
import classes from './Counter.module.css';

const Counter = () => {

  const dispatch = useDispatch()
  const counter = useSelector(state=> state.counter.counter)
  const showCounter = useSelector(state=>state.counter.showCounter)

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  function handleIncrement(){
    dispatch(counterActions.increment())
  }

  function handleDecrement(){
    dispatch(counterActions.decrement())
  }

  function handleIncrease(){
    dispatch(counterActions.increase({amount: 10}))
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
