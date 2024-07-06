import { legacy_createStore as createStore} from 'redux';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    counter: 0,
    showCounter: true
};

createSlice({
    
})

const counterReducer = (state = initialState , action) => {
 if(action.type === 'increment'){
    return{
        ... state,
        counter: state.counter + 1,
    }
 }

 if(action.type === 'increase'){
    return{
        ...state,
        counter: state.counter + action.amount,
    }
 }


 if(action.type === 'decrement'){
    return{
        ...state,
        counter: state.counter - 1,
    }
 }

 if(action.type === 'toggle'){
    return{
        ...state,
        showCounter: !state.showCounter,
    }
 }

 return state;

}

const store = createStore(counterReducer);

export default store; 