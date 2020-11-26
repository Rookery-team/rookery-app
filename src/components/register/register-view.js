import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';

/**
 * @param {string[]} inputs
 * @param {string[]} fields
 */
const validateForm = (inputs, fields) => {
  let result = true;

  for (const field of fields) {
    if (!(inputs[field] && inputs[field].length)) {
      result = false;
      break;
    }
  }

  return result;
};

const View = ({ inputs, handleChange, handleSubmit, working, error }) => {
  const formValid = validateForm(inputs, [
    'email',
    'first_name',
    'last_name',
    'password'
  ]);

  return (
    <section className={styles.register}>

      <form onSubmit={handleSubmit}>
        <h1>Inscription</h1>

        {error ? <p>{error}</p> : <></>}

        <div className={styles.groups}>

          <div className={styles.group}>
            <label htmlFor="first_name">Prénom</label>

            <input
              autoFocus
              className={styles.control}
              type="text"
              id="first_name"
              name="first_name"
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="last_name">Nom</label>

            <input
              autoFocus
              className={styles.control}
              type="text"
              id="last_name"
              name="last_name"
              onChange={handleChange}
            />
          </div>

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
          value="Inscription"
          disabled={!formValid || working}
        />

        <p>
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici</Link>
        </p>

      </form>

    </section>
  );
};

export default View;
