import React, { useEffect } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const App = props => {

  const {onTryAutoSignup} = props;

  useEffect(() => {
    onTryAutoSignup();
  },[onTryAutoSignup])

    let routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props}/>}/>
        <Route path="/" exact render={(props) => <BurgerBuilder {...props}/>}/>
        <Redirect to="/"/>
      </Switch>

    );
    if(props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" render={(props) => <Orders {...props}/>}/>
          <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
          <Route path="/logout" render={(props) => <Logout/>}/>
          <Route path="/auth" render={(props) => <Auth {...props}/>}/>
          <Route path="/" exact render={(props) => <BurgerBuilder {...props}/>}/>
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
         {routes}
        </Layout>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    isAuthenticated:state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup:() => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
