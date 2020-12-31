import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Meat', type:'meat'},
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(item => {
            return <BuildControl 
                    key={item.label} 
                    label={item.label} 
                    added={() => props.ingredientAdded(item.type)} 
                    removed={() => props.ingredientRemoved(item.type)}
                    disabled={props.disabled[item.type]}/>
            })}
             <button className={classes.OrderButton} disabled={props.purchasable} onClick={props.ordered}>
                {props.isAuthenticated ? "ORDER NOW" : "SIGNIN TO ORDER"}
             </button>
        </div>
       
    )

}

export default buildControls;