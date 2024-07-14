import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import {uiActions} from '../../store/ui-slice';


const CartButton = (props) => {

  const dispatch = useDispatch();
  const cartQualtity = useSelector(state => state.cart.totalQuantity)

  const toggleCartHeader = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHeader}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQualtity}</span>
    </button>
  );
};

export default CartButton;
