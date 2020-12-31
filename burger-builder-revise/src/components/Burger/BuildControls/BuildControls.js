import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "Salad", type: 'salad'},
    { label: "Bacon", type: 'bacon'},
    { label: "Cheese", type: 'cheese'},
    { label: "Meat", type: 'meat'},
]


const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: {props.price.toFixed(2)}</p>
            {controls.map(control => <BuildControl 
                type={control.type} 
                ingredientAdded={() => props.ingredientAdded(control.type)} 
                ingredientRemoved = {() => props.ingredientRemoved(control.type)}
                key={control.label} 
                label={control.label}
                disabled={props.disabled[control.type]}/>)}
            <button 
                className={classes.OrderButton}
                onClick={props.ordered}
                disabled={!props.purchaseable}>{props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}</button>
        </div>
    )
}

export default BuildControls;