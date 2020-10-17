import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from './index';

export default function PrivateRouteDev({
    component: Component,
    ...propsRem
}) {
    return (
        <Route 
            {...propsRem}
            render={props => isAutheticated().type==="U" ? (
                <Component {...props}/> //Render the component if user is authenticated.
            ) : (
                <Redirect //Redirect if he is not authenticated.
                    to={{
                        pathname: "/",
                        state: {
                            from :props.location
                        }
                    }}
                />
            )}
        />
    )
}