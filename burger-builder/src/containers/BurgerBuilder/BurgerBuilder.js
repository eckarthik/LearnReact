import React, { useState,useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index';
import * as actions from '../../store/actions/index';


export const BurgerBuilder  = props =>  {

    const [purchasing,setPurchasing] = useState(false);

    const purchaseHandler = () => {
        
        if(props.isAuthenticated) {
            setPurchasing(true)
        }
        else {
            props.onSetAuthRedirectPath("/checkout");
            props.history.push("/auth");
        }
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key,index)=> {
                return ingredients[key]
            })
            .reduce((sum,el) => {
                return sum+el;
            },0);
        return sum > 0;
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push("/checkout")
    }

    useEffect(() => {
        props.onInitIngredients()
    },[]);

        const disabledInfo = {
            ...props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key]<=0
        }
        let orderSummary = null;    
        let burger = props.error ? <p>Ingredients cannot be loaded</p>:<Spinner/>
        if(props.ings) {
            burger = <Aux>
                        <Burger ingredients={props.ings}/>
                            <BuildControls
                                ingredientAdded={props.onIngredientAdded}
                                ingredientRemoved={props.onIngredientRemoved}
                                disabled={disabledInfo}
                                purchasable={!updatePurchaseState(props.ings)}
                                price={props.price}
                                isAuthenticated = {props.isAuthenticated}
                                ordered={purchaseHandler}/>
                    </Aux>
            orderSummary = <OrderSummary ingredients={props.ings} totalPrice={props.price} purchaseCancelled={purchaseCancelHandler} purchaseContinue={purchaseContinueHandler}/>
        }
        return (
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
}

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded:(ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved:(ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients:() => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:() => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath:(path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));