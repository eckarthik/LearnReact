import React from 'react';
import User from '../../components/User';

const authIndexPage = (props) => (
    <div>
        <h1>
            The Auth Index Page of {props.appName}
            <User name="Karthik" age={24}/>
        </h1>
    </div>

    
);

authIndexPage.getInitialProps = context => {
    const promise = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve({appName:"Super Auth App"})
        },1000)
    })
    return promise;
}

export default authIndexPage;