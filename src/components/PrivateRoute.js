import React from 'react'
import { Redirect, Route } from 'react-router';
import Auth from "./Auth";

let auth;
auth = null;
auth = true; 

const PrivateRoute = ({component: Component, ...rest}) => {
    
    

    console.log(Auth.isAuthenticated());
    return (
        <div>
            <Route {...rest}>{ Auth.isAuthenticated() ? <Component /> : <Redirect to="/" />}</Route>
        </div>
    );
}



export default PrivateRoute;
