import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

import Footer from '../Footer';
import Header from '../Header';
import Routes from '../../routes/Routes.js';

import styles from './index.module.scss';


const App = withRouter(({location}) => {
    // Strate token : Token de connexion
    const [token, setToken] = useState(localStorage.getItem('access_token'));

    // Strate Affix: Navbar affix ou non lors du scroll
    const [affix, setAffix] = useState(false)

    // On met à jour affix en fonction du scroll
    const updateAffix = () => {
        const scrollTop = window.scrollY;
        setAffix(128 < scrollTop)
    }

    // Listener lors du scroll
    const handleScroll = (event) => {
        updateAffix()
    }

    // On ajoute le listener lors du scroll sur document
    document.addEventListener('scroll', handleScroll)

    return (
        <>
            {/* Si connecté, on affiche le header avec le token, sinon un header classique */}
            {token ? (
                <Header
                    affix={affix}
                    token={token}
                    location={location}
                />
            ) : (
                <Header affix={affix} />
            )}

            {/* Quelque soit la route, on affiche la page */}
            <div className={styles.page}>
                {/* On appelle les routes*/}
                <Routes token={token} />
            </div>

            {/* On affiche le footer */}
            <Footer />
        </>
    );
});

export default App;
