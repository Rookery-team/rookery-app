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

const View = ({ inputs, email, handleChange, handleSubmit, working, error }) => {
  const formValid = validateForm(inputs, [
    'email',
    'pseudo',
    // 'birthday',
    'first_name',
    'last_name',
    'password'
  ]);

  return (
    <section className={styles.register}>

      <form onSubmit={handleSubmit}>
        <h1>Inscription</h1>

        {error && <p>{error}</p>}

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
              className={styles.control}
              type="text"
              id="last_name"
              name="last_name"
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="pseudo">Pseudo</label>

            <input
              className={styles.control}
              type="text"
              id="pseudo"
              name="pseudo"
              onChange={handleChange}
            />
          </div>

          <div className={styles.group}>
            <label htmlFor="email">Email</label>

            <input
              className={styles.control}
              type="text"
              id="email"
              name="email"
              value={email}
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

        <Link to="/login">
          Vous avez déjà un compte ? Connectez-vous
        </Link>

      </form>

    </section>
  );
};

export default View;
