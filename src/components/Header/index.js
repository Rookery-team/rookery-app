import styles from './index.module.scss'

import logo from 'assets/images/logo.png';
import {Link} from "react-router-dom";

const Header = (
    {
        affix
    }) => {

    console.log('Header affix', {affix})

    return (
        <nav className={styles.main + (affix ? ' ' + styles.affix : '' )}>
            <div className={styles.container}>
                <img className={styles.logo} alt="Rookery" src={logo} loading="eager"/>
                <div className={styles.menus}>
                    <Link to="/">Accueil</Link>
                </div>
            </div>
        </nav>
    )

}

export default Header
