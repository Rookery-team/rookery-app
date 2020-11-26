import React, { useState } from 'react';

import View from './password-reset-view.js';

import { useParams } from 'react-router-dom';
import History from '../../history';
const PasswordReset = props => {
  const [state, setState] = useState({
    password: '',
    message: ''
  });

  const handleChange = event => {
    event.persist();
    setState(current => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const { token } = useParams();

  const handleSubmit = event => {
    event.preventDefault();

    setState(current => ({
      ...current,
      error: ''
    }));

    fetch(process.env.REACT_APP_BACK_URL + '/api/password-reset/' + token, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: props.props.location.search.substring(
          props.props.location.search.indexOf('=') + 1
        ),
        password: state.password
      })
    })
      .then(resp => resp.json())
      .then(session => {
        if (!session.error) {
          History.push('/login');
          window.location.reload();
        } else {
          setState(current => ({
            ...current,
            message: 'Erreur'
          }));
        }
      });
  };

  return (
    <View
      password={state.password}
      message={state.message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default PasswordReset;
