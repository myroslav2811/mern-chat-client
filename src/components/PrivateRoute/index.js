import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../Context/Auth'
import { Loading } from '../Loading'

export const PrivateRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <Route {...rest} render={props => (
            !isLoading
                ?
                (
                    isAuthenticated
                        ?
                        <Component {...props} />
                        :
                        <Redirect to={'/signin'} />
                )
                :
                <Loading />
        )} />
    );
};