import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key, index) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span> :{" "}
        {props.ingredients[key]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;