import React from 'react';
import BurgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="burger-logo"/>
        </div>
    );
};

export default Logo;