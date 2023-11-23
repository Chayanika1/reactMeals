import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';
const isEmpty=value=>value.trim()==='';
const isFiveChars = value=>value.trim().length !==5;

const Checkout = (props) => {
    const[formInputValidity,setFormInputValidity]=useState({
        name:true,street:true,postal:true,city:true

    })
    const nameInput = useRef();
    const streetInput = useRef();
    const postalInput = useRef();
    const cityInput = useRef()
    function confirmHandler(e){
   e.preventDefault();
   const enetredName = nameInput.current.value;
   const enteredStreetName = streetInput.current.value;
   const enteredPostal = streetInput.current.value;
   const enteredCity = cityInput.current.value;
   const enteredNameIsValid = !isEmpty(enetredName);
   const streetIsValid = !isEmpty(enteredStreetName);
   const postalIsValid = !isEmpty(enteredPostal);
   const cityIsInputValid = !isEmpty(enteredCity);
   const formIsValid = enteredNameIsValid && streetIsValid &&postalIsValid && cityIsInputValid;
      
setFormInputValidity({
    name:enteredNameIsValid,
    street:streetIsValid,
    postal:postalIsValid,
    city:cityIsInputValid
})

   if(!formIsValid){
    return ;
   }
   props.onConfirm({
    name:enetredName,
    street:enteredCity,
    postal:enteredPostal,
    city:enteredCity

   })
    }
    
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name ?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInput} />
      </div>
      {!formInputValidity.name && <p>Please enter a valid name</p>}
      <div className={`${classes.control} ${formInputValidity.street ?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInput} />
      </div>
      {!formInputValidity.street && <p>Please enter a valid street</p>}

      <div className={`${classes.control} ${formInputValidity.postal ?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInput}/>
      </div>
      {!formInputValidity.postal && <p>Please enter a valid postal(5 characters)</p>}

      <div className={`${classes.control} ${formInputValidity.city ?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'ref={cityInput} />
      </div>
      {!formInputValidity.city && <p>Please enter a valid city</p>}

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
    );
};

export default Checkout;