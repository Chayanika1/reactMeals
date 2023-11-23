import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];
const AvailableMeals = () => {
  const[meals,setMeals]=useState([]);
  const[isLoaded,setIsLoaded] = useState(false);
  const[httpError,setHttpError] = useState();
  useEffect(()=>{
    const fetchMeals = async()=>{
      setIsLoaded(true)
     const response = await fetch('https://react-http-47bda-default-rtdb.firebaseio.com/meals.json')
     if(!response.ok){
      throw new Error("something went wrong")
     }
      const resData = await response.json();
      const loadedMeals = [];
      for(const key in resData){
        loadedMeals.push({
          id:key,
          name:resData[key].name,
          description:resData[key].description,
          price: resData[key].price

        })
        

      }
      setMeals(loadedMeals)
        setIsLoaded(false)
    };
    // fetchMeals();
    
      fetchMeals().catch((error)=>{
        setIsLoaded(false);
        setHttpError(error.message);

      });
      

    
    

  },[])
  if(isLoaded){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if(httpError){
    return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
  }
    const mealsList = meals.map(meal=><MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description}price={meal.price}/>)
    return (
        <section className={classes.meals}>
            <Card>
            <ul>
                {mealsList}
            </ul>
            </Card>
            
        </section>
    );
};

export default AvailableMeals;