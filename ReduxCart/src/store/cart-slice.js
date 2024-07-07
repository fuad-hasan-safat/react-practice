import { createSlice } from "@reduxjs/toolkit"

const initialCartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers:{
        addItem(state, actions){
            state.items.push(actions.payload.item)
        },
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;