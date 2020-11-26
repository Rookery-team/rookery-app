import React from 'react';

const View = ({ password, handleChange, handleSubmit, message }) => {
  return (
    <div className="login_page">
      <form className="login" onSubmit={handleSubmit}>
        <h1>Nouveau mot de passe</h1>
        {message ? <p>{message}</p> : <></>}

        <label className="login__label" htmlFor="password">
          Nouveau Mot de passe
        </label>

        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />

        <input
          className="login__button"
          type="submit"
          value="Changer de mot de passe"
        />
      </form>
    </div>
  );
};

export default View;
