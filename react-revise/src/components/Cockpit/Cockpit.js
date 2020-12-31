import React, {useEffect} from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props) => {

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
            alert("Saved data to cloud")
        },1000)
    },[props.persons]);


    let classes1 = []

    if(props.persons.length <=2 )
    {
      classes1.push(classes.red);
    }
    if(props.persons.length <= 1) {
      classes1.push(classes.bold)
    }

    console.log('[Cockpit.js] rendering...');


    return (
        <div>
            <button
           className = {classes.Button}
           onClick={props.clicked}>Toggle Persons</button>
            <h1>{props.title}</h1>
            <p className={classes1.join(' ')}>It is working</p>
        </div>
    );
}

export default Cockpit;