import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

const Layout = (props) => {

    const [showSideDrawer,setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }
    const sideDrawerToggleHandler = () => {
        // this.setState((prevState) => {
        //     return {showSideDrawer:!this.state.showSideDrawer}
        // });
        setShowSideDrawer(!showSideDrawer);
    }
        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={sideDrawerToggleHandler}
                    isAuthenticated = {props.isAuthenticated}/>
                <SideDrawer 
                    open={showSideDrawer} 
                    closed={sideDrawerClosedHandler}
                    isAuthenticated = {props.isAuthenticated}/>
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Aux>
           
        );
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);