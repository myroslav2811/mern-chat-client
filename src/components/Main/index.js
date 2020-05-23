import React from 'react';

import './Main.css';
import { ContactList } from '../ContactList';
import { Dialog } from '../Dialog'

export const Main = () => {
    return (
        <div className='container'>
            <ContactList />
            <Dialog />
        </div>
    )
}
