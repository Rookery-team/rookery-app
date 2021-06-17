import styles from './index.module.scss'

import logo from 'assets/images/logo.png';
import {Link} from "react-router-dom";

const Header = ({token, affix}) => {

    return (
        <nav className={styles.navigation} data-affix={affix}>
            {/* Container */}
            <div className={styles.container}>

                {/* Logo */}
                <img className={styles.logo} alt="Rookery" src={logo} loading="eager" />

                {
                    !token &&
                    <>
                        {/* Menu */}
                        <div className={styles.menus}>
                            <Link to="/">Accueil</Link>
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
                            <Link to="/">Accueil</Link>
                        </div>
                    </>
                }

            </div>
        </nav>
    )

}

export default Header
