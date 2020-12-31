import React from 'react';
import BurgerLogo from '../../assets/original.png';
import classes from './Logo.module.css';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="My Burger" width="80" height="80"/>
        </div>
    );
}

export default logo;