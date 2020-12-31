import React from 'react';

const userinput = (props) => {
    return (
        <div className="UserInput">
            <input type="text" onChange={props.changed} value={props.name}/>
        </div>
    );
}

export default userinput;