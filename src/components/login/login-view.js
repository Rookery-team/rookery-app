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

    <form onSubmit={handleSubmit}>
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

    </form>

  </section>
  );
};

export default View;
