import styles from './index.module.scss'

import logo from 'assets/images/logo.png';
import {Link, useHistory} from "react-router-dom";
import {NavbarDropdown} from "../../widgets/navbar-dropdown";
import React from "react";

const Header = ({token, affix}) => {

    const history = useHistory()

    const handleClickLogout = event => {
        event.preventDefault()
        localStorage.removeItem('access_token')
        history.push('/')
        history.go(0)
    }

    return (
        <nav className={styles.navigation} data-affix={affix}>
            {/* Container */}
            <div className={styles.container}>

                {/* Logo */}
                <img className={styles.logo} alt="Rookery" src={logo} loading="eager" />

                {
                    !token &&
                    <>
                        {/* Menu Left */}
                        <div className={styles.menus}>
                            <Link to="/">Accueil</Link>
                        </div>
                        {/* Menu Right */}
                        <div className={styles.menus}>
                            <Link to="/register">S'inscrire</Link>
                            <Link to="/login">Se connecter</Link>
                        </div>
                    </>
                }

                {
                    token &&
                    <>
                        {/* Menu left */}
                        <div className={styles.menus}>
                            <Link to="/">Accueil</Link>
                        </div>

                        {/* Menu Right */}
                        <div className={styles.menus}>
                            <NavbarDropdown
                                image={<>
                                    <img
                                        src="https://picsum.photos/64/64"
                                        alt="Avatar"
                                        aria-label="Avatar"
                                    />
                                </>}
                                entries={[
                                    <Link onClick={event=>{
                                        alert('Fonctionnalité en cours d\'implémentation')
                                    }}>Compte</Link>,
                                    <Link onClick={event=>{
                                        alert('Fonctionnalité en cours d\'implémentation')
                                    }}>Centre d'aide</Link>,
                                    <Link onClick={handleClickLogout}>Se deconnecter</Link>,
                                ]}
                            />
                            {/*<NavbarDropdown
                                icon={<>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path
                                            d="M490.667 405.333h-56.811C424.619 374.592 396.373 352 362.667 352s-61.931 22.592-71.189 53.333H21.333C9.557 405.333 0 414.891 0 426.667S9.557 448 21.333 448h270.144c9.237 30.741 37.483 53.333 71.189 53.333s61.931-22.592 71.189-53.333h56.811c11.797 0 21.333-9.557 21.333-21.333s-9.535-21.334-21.332-21.334zm-128 53.334c-17.643 0-32-14.357-32-32s14.357-32 32-32 32 14.357 32 32-14.358 32-32 32zM490.667 64h-56.811c-9.259-30.741-37.483-53.333-71.189-53.333S300.736 33.259 291.477 64H21.333C9.557 64 0 73.557 0 85.333s9.557 21.333 21.333 21.333h270.144C300.736 137.408 328.96 160 362.667 160s61.931-22.592 71.189-53.333h56.811c11.797 0 21.333-9.557 21.333-21.333S502.464 64 490.667 64zm-128 53.333c-17.643 0-32-14.357-32-32s14.357-32 32-32 32 14.357 32 32-14.358 32-32 32zM490.667 234.667H220.523c-9.259-30.741-37.483-53.333-71.189-53.333s-61.931 22.592-71.189 53.333H21.333C9.557 234.667 0 244.224 0 256c0 11.776 9.557 21.333 21.333 21.333h56.811c9.259 30.741 37.483 53.333 71.189 53.333s61.931-22.592 71.189-53.333h270.144c11.797 0 21.333-9.557 21.333-21.333.001-11.776-9.535-21.333-21.332-21.333zM149.333 288c-17.643 0-32-14.357-32-32s14.357-32 32-32 32 14.357 32 32-14.357 32-32 32z"/>
                                    </svg>
                                </>}
                                entries={[
                                    <Link to="/lien-1">Lien 1</Link>,
                                    <Link to="/lien-2">Lien 2</Link>
                                ]}
                            />*/}
                        </div>
                    </>
                }

            </div>
        </nav>
    )

}

export default Header
