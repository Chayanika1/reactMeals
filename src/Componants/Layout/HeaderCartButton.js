import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css'
import CartIcon from './CartIcon';
import CartContext from '../../Store/cart-context';
const HeaderCartButton = (props) => {
    const[btnHighLighted,setBtnHighlighted] = useState(false)
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber,item)=>{
        return curNumber+item.amount;
    },0);//reduce convert array to a single value
    const buttonClasses = `${classes.button} ${btnHighLighted ?classes.bump: ''}`;
  const{items} = cartCtx
    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setBtnHighlighted(true);
        //to remove the animation and reset it
       const timer =  setTimeout(()=>{
            setBtnHighlighted(false)
        },3000)
        return()=>{
            clearTimeout(timer)
        }
    },[items])

    return (
        <button className={buttonClasses} onClick={props.onclick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;