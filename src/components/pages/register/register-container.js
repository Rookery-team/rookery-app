import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import View from './register-view.js';

const Register = ({ handleUserSession }) => {
  const [inputs, setInputs] = useState({});

  const [working, setWorking] = useState(false);
  const [error, setError] = useState('');

  const handleChange = event => {
    event.persist();

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    if (!event || working) {
      return;
    }

    event.preventDefault();
    setWorking(true);

    fetch(process.env.REACT_APP_BACK_URL + '/api/register/', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: inputs['email'],
        first_name: inputs['first_name'],
        last_name: inputs['last_name'],
        password: inputs['password']
      })
    }).then(res => {
      if (!res.ok) {
        setError(
          'Erreur ! Les informations sont invalides, ou alors votre invitation a expirée'
        );
        setWorking(false);
        return;
      }
      fetch(process.env.REACT_APP_BACK_URL + '/oauth/token', {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          username: inputs['email'],
          password: inputs['password'],
          grant_type: 'password',
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          scope: ''
        })
      })
        .then(res => res.json())
        .then(session => {
          handleUserSession(session);
        });
    });
  };

  return (
    <View
      inputs={inputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      working={working}
      error={error}
    />
  );
};

export default Register;
