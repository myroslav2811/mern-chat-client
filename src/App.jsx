import React from 'react';
// import io from 'socket.io-client';
import { Route } from 'react-router-dom'

import { SignInWithFormik } from './components/SignIn';
import { SignUpWithFormik } from './components/SignUp';
import { PrivateRoute } from './components/PrivateRoute';
import { Main } from './components/Main'
import { Dialog } from './Context/Dialogs';
import { Messages } from './Context/Messages';
import { Auth } from './Context/Auth';
import { Socket } from './Context/Socket';

const App = () => {

    return (
        <Auth>
            <Dialog>
                <Messages>
                    <Socket>
                        <Route component={SignInWithFormik} path="/signin" exact />
                        <Route component={SignUpWithFormik} path="/signup" exact />
                        <PrivateRoute component={Main} path="/" exact />
                    </Socket>
                </Messages>
            </Dialog>
        </Auth>
    )
};

export default App;