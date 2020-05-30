import React, { useState, useContext, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TextField from '@material-ui/core/TextField';

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
    const { user } = useContext(AuthContext);
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(() => {
        getDialogs();
        // eslint-disable-next-line
    }, [])

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
                <div>
                    <h3>Hello, {user ? user.username : null}</h3>
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
                        {filtered.length
                            ? <div>
                                <p style={{ padding: '10px', fontSize: '18px', backgroundColor: '#3f51b5', color: '#fff' }}>
                                    Dialogs
                                </p>
                                {filtered.map(item => <Contact updatedAt={item.updatedAt}
                                    username={item.to.username}
                                    id={item._id}
                                    lastMessage={item.lastMessage}
                                    key={item._id}
                                    item={item}
                                    avatar={item.to.avatar} />)}
                            </div>
                            : <EmptyComponent text='There are no contacts' />}
                        {results
                            ? <div>
                                <p style={{ padding: '10px', fontSize: '18px', backgroundColor: '#3f51b5', color: '#fff' }}>
                                    Global search result
                                </p>
                                {isSearching
                                    ? <Loading />
                                    : results.length
                                        ? results.map(item => <Contact username={item.username} userId={item._id} avatar={item.avatar} isSearching={true} key={item._id} />)
                                        : <EmptyComponent text='There are no similar contacts' />
                                }
                            </div>
                            : null}
                    </Scrollbars>}

            </div>
        </div >
    )
}