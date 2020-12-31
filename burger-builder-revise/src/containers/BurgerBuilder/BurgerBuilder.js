import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
       this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing:true})
        }
        else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/auth");
        }
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
        return sum>0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
    //     this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
    //     this.updatePurchaseState(updatedIngredients);
    // }

   

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <=0) return;
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert("You Continue");
       
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push("price="+this.state.totalPrice);
        // const queryString = queryParams.join("&")
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients fetching failed</p> : <Spinner/>;

        if (this.props.ings) {
            burger = <Aux>
            <Burger ingredients={this.props.ings}/>
               <BuildControls
                   disabled={disabledInfo}
                   ingredientAdded={this.props.onIngredientAdded}
                   ingredientRemoved={this.props.onIngredientRemoved}
                   purchaseable = {this.updatePurchaseState(this.props.ings)}
                   price={this.props.totalPrice}
                   isAuth={this.props.isAuthenticated}
                   ordered={this.purchaseHandler}/>
           </Aux>

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.props.totalPrice.toFixed(2)}/>
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: ()=> dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));