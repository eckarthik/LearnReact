import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
    }
    switch(props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} onChange={props.changed} value={props.value}/>
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(" ")} {...props.elementConfig} onChange={props.changed} value={props.value}/>
            break;
        case ('select'):
            inputElement = <select className={inputClasses.join(" ")} value={props.value} onChange={props.changed}>
                                {props.elementConfig.options.map(option => (
                                    <option value={option.value} key={option.value}>{option.displayValue}</option>
                                ))}
                            </select>
            break;
        default:
            inputElement = <input className={inputClasses.join(" ")} {...props.elementConfig} value={props.value}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <p className={classes.ValidationError}>{validationError}</p>
        </div>
    )
}

export default input;