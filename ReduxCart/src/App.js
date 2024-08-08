import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';

function App() {

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart Data'
      })
    )
     const response = await fetch('https://redux-backend-9a30c-default-rtdb.firebaseio.com/cart.json', {
        method: 'Put',
        body: JSON.stringify(cart),
      });

      if(!response.ok){
        throw new Error('Sending Cart Data Failed');
      }

      dispatch(uiActions.showNotification({
        status: 'sucess',
        title: 'Sucess...',
        message: 'Sending Cart Data Sucesfully'
      })
    )

    sendCartData().catch(error => {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error...',
        message: 'Sending Cart Data Failed!'
      })
    )
    });
    }

  }, [cart, dispatch]);
  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
    
  );
}

export default App;
