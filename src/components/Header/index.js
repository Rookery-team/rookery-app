import styles from './index.module.scss'

import logo from 'assets/images/logo.png';
import {Link} from "react-router-dom";

const Header = ({affix}) => {

    return (
        <nav className={styles.navigation} data-affix={affix}>
            {/* Container */}
            <div className={styles.container}>

                {/* Logo */}
                <img className={styles.logo} alt="Rookery" src={logo} loading="eager" />

                {/* Menu */}
                <div className={styles.menus}>
                    <Link to="/">Accueil</Link>
                </div>

            </div>
        </nav>
    )

}

export default Header
