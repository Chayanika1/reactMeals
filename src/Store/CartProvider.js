import React, { useReducer } from 'react';
import CartContext from './cart-context';
const defaultCartState = {
    items:[],
    totalAmount:0
}
//to manage state// state=last state snapshot
const cartReducer = (state,action)=>{
    if(action.type==='addCartItem'){
        const existingCartItemIndex = state.items.findIndex(item=>item.id===action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem){
           const updatedItem={
                ...existingCartItem,amount:existingCartItem.amount+action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
             updatedItems = state.items.concat(action.item);

        }


       
        
        const updatedTotalAmount = state.totalAmount+action.item.price * action.item.amount;
        console.log({items:updatedItems,totalAmount:updatedTotalAmount})
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
        
    }
    if(action.type==='remove'){
        const exitingCartItemIndex = state.items.findIndex((item)=>item.id===action.id);
        const existingItem = state.items[exitingCartItemIndex]
        const updatedTotalAmount =  state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount===1){
            updatedItems=state.items.filter(item=>item.id !==action.id);

        }else{
            const updatedItem = {...existingItem,amount:existingItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[exitingCartItemIndex]=updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }


    }
    if(action.type==='clear'){
        return defaultCartState;

        
    }
    return defaultCartState;

}
console.log()
const CartProvider = (props) => {
   const[cartState,dispatchCartAction]= useReducer(cartReducer,defaultCartState)//ueReducer always returns an array
    const addItemCartHandler=(item)=>{
        dispatchCartAction({type:'addCartItem', item:item})
    }
    const removeItemCartHandler=(id)=>{
        dispatchCartAction({type:'remove',id:id})
    }
    const clearCart=()=>{
        dispatchCartAction({type:'clear'})
    }
    const cartContext={
        items:cartState.items,
    totalAmount:cartState.totalAmount,
    addItem:addItemCartHandler,
    removeItem:removeItemCartHandler,
    clearCart:clearCart
    }
    
    return (
       <CartContext.Provider value={cartContext}>
         {props.children}
       </CartContext.Provider>
    );
};

export default CartProvider;