import React from 'react';

const style = {
    width: '600px',
    backgroundColor: '#fff',
    padding: '50px',
    borderRadius: '5px',
    margin: '100px auto',
    textAlign: 'center',
    color: '#303030'
}

export const SuccessSignUp = () => {
    return (
        <div style={style}>
            <h3>Your account succefuly created!</h3>
            <p>You will be automatically redirected to the login page.</p>
        </div>
    );
}