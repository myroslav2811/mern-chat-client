import React from 'react';

export const EmptyComponent = ({ text }) => {

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        opacity: '0.6',
        fontSize: '20px',
        padding: '30px 20px',
        textAlign: 'center'
    }

    return (
        <div style={style}>
            {text}
        </div>
    )
};