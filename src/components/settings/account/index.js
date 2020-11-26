import React, { useState } from 'react';

const Account = props => {
  props = props.props;
  const [state, setState] = useState(props.userData);

  const handleChange = event => {
    event.persist();

    setState(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const updateSettings = event => {
    event.preventDefault();

    if (!props.preferences) return;
    var prefs = props.preferences.preferences;

    if (!props.preferences.themes_activated) prefs.prop_themes = -1;

    fetch(
      process.env.REACT_APP_BACK_URL +
        '/api/settings?profile_id=' +
        props.currentProfile.id,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + props.token
        },
        method: 'PUT',
        body: JSON.stringify({
          email: state.email,
          first_name: state ? state.first_name : '',
          last_name: state.last_name,
          password: state.password,
          preferences: JSON.stringify(prefs)
        })
      }
    )
      .then(res => res.json())
      .then(() => {
        setState(current => ({ ...current, status: 'Mise à jour réussie ! ' }));
      });
  };

  return (
    <>
      <h4>Informations générales</h4>

      <p>{state.status}</p>

      <form className="infoGenerales" onSubmit={updateSettings}>
        <div className="form-row">
          <p>
            <label htmlFor="first_name">PRENOM</label>
            <input
              type="text"
              name="first_name"
              placeholder="Chuck"
              value={state.first_name}
              onChange={handleChange}
            />
          </p>

          <p>
            <label htmlFor="last_name">NOM</label>
            <input
              type="text"
              name="last_name"
              placeholder="Bartowski"
              value={state.last_name}
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="form-row">
          <p>
            <label htmlFor="email"> ADRESSE EMAIL</label>
            <input
              type="text"
              name="email"
              placeholder="chuck.bartowski@liigem.io"
              value={state.email}
              onChange={handleChange}
            />
          </p>

          <p>
            <label htmlFor="password">NOUVEAU MOT DE PASSE</label>
            <input
              type="password"
              name="password"
              placeholder="Entrez le nouveau mot de passe"
              value={state.password}
              onChange={handleChange}
            />
          </p>
        </div>
        <input className="btn" type="submit" value="Mettre à jour" />
      </form>
    </>
  );
};

export default Account;
