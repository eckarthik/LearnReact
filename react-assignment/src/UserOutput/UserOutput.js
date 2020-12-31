import React from 'react';

const useroutput = (props) => {
    return (
        <div className="UserInput">
            <p>My name is {props.name}</p>
            <p>My age is {props.age}</p>
        </div>
    );
}

export default useroutput;