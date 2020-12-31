import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredient => {
           return [...Array(props.ingredients[ingredient])].map((_,index) => {
               return <BurgerIngredient key={index+ingredient} type={ingredient} /> 
           })
        })
        .reduce((arr,el) => {
            return arr.concat(el);
        },[]);
    
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding the ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger;