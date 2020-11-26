import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import Routes from '../../routes/Routes.js';

import styles from './index.module.scss';


const App = withRouter(({location}) => {
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    const [affix, setAffix] = useState(false)

    const updateAffix = () => {
        const scrollTop = window.scrollY;
        setAffix(128 < scrollTop)
    }

    const handleScroll = (event) => {
        updateAffix()
    }

    document.addEventListener('scroll', handleScroll)

    return (
        <>
            {token ? (
                <Header
                    affix={affix}
                    token={token}
                    location={location}
                />
            ) : (
                <Header affix={affix} />
            )}

            <div className={styles.page}>
            <Routes
                token={token}
            />
            </div>

            <Footer />
        </>
    );
});

export default App;
