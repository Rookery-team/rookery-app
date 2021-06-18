import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import View from './register-view.js';

const Register = ({handleUserSession}) => {
    const [inputs, setInputs] = useState({});

    const [working, setWorking] = useState(false);
    const [error, setError] = useState('');

    const history = useHistory()

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

        fetch(process.env.REACT_APP_BACK_URL + '/app/user/new/', {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: inputs['email'],
                pseudo: inputs['pseudo'],
                firstname: inputs['first_name'],
                lastname: inputs['last_name'],
                password: inputs['password'],
                // birthday: inputs['birthday'],
                // gender: inputs['gender'],
                birthday: 0,
                gender: 'mal'
            })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.ok) {
                    setError(
                        // 'Erreur ! Les informations sont invalides, ou alors votre invitation a expirée'
                        'Erreur ! Les informations sont invalides.'
                    );
                    setWorking(false);
                    return;
                }

                history.push('/login')

                /*fetch(process.env.REACT_APP_BACK_URL + '/oauth/token', {
                  headers: {
                    Accept: 'application/json, text/plain, *\/*',
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
                  });*/
            });
    };

    const email = localStorage.getItem('rookery_register_email')
    localStorage.removeItem('rookery_register_email')

    return (
        <View
            inputs={inputs}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            working={working}
            error={error}
            email={email}
        />
    );
};

export default Register;
