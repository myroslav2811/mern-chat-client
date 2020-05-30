import React, { useState, useContext, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './ContactList.css';
import { Contact } from '../Contact'
import { DialogContext } from '../../Context/Dialogs';
import { Loading } from '../Loading';
import { EmptyComponent } from '../EmptyComponent';
import { useDebounce } from '../../services/debounce';
import { searchContacts } from '../../services/searchContacts'
import { AuthContext } from '../../Context/Auth';

export const ContactList = () => {

    const [value, setValue] = useState('');
    const [results, setResults] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const { getDialogs, filtered, filterDialogs, isLoading } = useContext(DialogContext);
    const { user, logout } = useContext(AuthContext);
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(() => {
        getDialogs();
        // eslint-disable-next-line
    }, [user])

    useEffect(
        () => {
            if (debouncedSearchTerm && value.trim()) {
                setIsSearching(true);
                searchContacts(debouncedSearchTerm).then(results => {
                    setIsSearching(false);
                    setResults(results);
                });
            } else {
                setResults(null);
            }
        },
        // eslint-disable-next-line
        [debouncedSearchTerm]
    );

    const handleChange = (e) => {
        setValue(e.target.value)
        filterDialogs(e.target.value.trim());
    }

    return (
        <div className='contactList'>
            <div className='headerListContainer'>
                <div className='greeting' >
                    <h3>{user ? user.username : null}</h3>
                    <Button onClick={logout}>Log out</Button>
                </div>
                <div className='searchPanel'>
                    <TextField type="text"
                        label="Search"
                        value={value}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined" />
                </div>
            </div>
            <div className='scrollbarContainer'>
                {isLoading
                    ? <Loading />
                    : <Scrollbars autoHide
                        autoHideTimeout={1000}
                        autoHideDuration={200}
                        renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} />}>
                        <div>
                            <p className="listHeader">
                                Dialogs
                                </p>
                            {filtered.length
                                ? filtered.map(item => <Contact updatedAt={item.updatedAt}
                                    username={item.to.username}
                                    id={item._id}
                                    lastMessage={item.lastMessage}
                                    key={item._id}
                                    item={item}
                                    avatar={item.to.avatar} />)
                                : <EmptyComponent text='There are no contacts. Find user using the field above and start messaging' />}
                        </div>
                        {results
                            ? <div>
                                <p className="listHeader">
                                    Global search result
                                </p>
                                {isSearching
                                    ? <Loading />
                                    : results.length
                                        ? results.map(item => <Contact username={item.username} userId={item._id} avatar={item.avatar} isSearching={true} key={item._id} />)
                                        : <EmptyComponent text='There are no contacts' />
                                }
                            </div>
                            : null}
                    </Scrollbars>}
            </div>
        </div >
    )
}