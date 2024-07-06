import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    additemToCart: () => { },
    updateItemQuantity: () => { },
})


function shoppingCartReducer(state, action) {
    console.log(DUMMY_PRODUCTS)

    if(action.type === 'ADD_ITEM'){
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            console.log({product})
            updatedItems.push({
                id: action.payload.id,
                name: product?.title,
                price: product?.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    if(action.type === 'UPDATE_ITEM'){
        const updatedItems = [...state.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems,
            };
        
    }

    return state;

}

export default function CartContextProvider({ children }) {

    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        shoppingCartReducer,
        {
            items: [],
        }
    )


    function handleAddItemToCart(id) {

        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: {
                id
            }
        })

    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload:{
                productId,
                amount
            }
        })
      
    }

    const cntxtValue = {
        items: shoppingCartState.items,
        additemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    }

    return <CartContext.Provider value={cntxtValue}>
        {children}
    </CartContext.Provider>

}