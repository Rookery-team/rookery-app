import React from 'react';
// import { propTypes } from 'react-svg-spinner';

import styles from './index.module.scss';
import {Link} from "react-router-dom";

const View = ({
                  email,
                  password,
                  handleChange,
                  handleSubmit,
                  error,
                  resetPassword
              }) => {

    const validateForm = () => {
        return email && email.length > 0 && password && password.length > 0;
    };

    return (
        <section className={styles.login}>

            <form onSubmit={handleSubmit} name="form-login">
                <h1>Connexion</h1>

                {error ? <p>{error}</p> : <></>}

                <div className={styles.groups}>

                    <div className={styles.group}>
                        <label htmlFor="email">Email</label>

                        <input
                            autoFocus
                            className={styles.control}
                            type="text"
                            id="email"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.group}>
                        <label htmlFor="password">Mot de passe</label>

                        <input
                            className={styles.control}
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>

                </div>

                <input
                    className={styles.btn}
                    type="submit"
                    value="Se connecter"
                    disabled={!validateForm()}
                />

                <a className={styles.password_reset} href="#" onClick={resetPassword}>
                    Mot de passe oublié ? Cliquez-ici !
                </a>

                <div
                    aria-label="Loading Screen"
                    className="hidden">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

            </form>

        </section>
    );
};

export default View;
