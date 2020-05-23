import React from 'react';

export const EmptyComponent = ({ text }) => {

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        margin: '0 auto'
    }

    return (
        <div style={style}>
            {text}
        </div>
    )
};