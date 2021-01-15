﻿import React, {useState} from 'react';

import View from './login-view.js';

const Login = ({handleUserSession}) => {
    const [state, setState] = useState({
        email: '',
        password: '',
        error: ''
    });

    const handleChange = event => {
        event.persist();
        setState(current => ({
            ...current,
            [event.target.name]: event.target.value
        }));
    };

    const resetPassword = () => {
        fetch(process.env.REACT_APP_BACK_URL + '/api/password/request', {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: state.email
            })
        }).then(() => {
            setState(current => ({...current,
                error:
                    'Si votre compte existe, un email vous a été envoyé avec des indications pour récupérer votre mot de passe'
            }));
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        setState(current => ({...current, error: ''}));

        fetch(process.env.REACT_APP_BACK_URL + '/oauth/token', {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: state.email,
                password: state.password,
                grant_type: 'password',
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                scope: ''
            })
        })
            .then(response => response.json())
            .then(session => {

                if (!session.error) {
                    handleUserSession(session); // Will redirect
                    return;
                }

                setState(current => ({
                    ...current,
                    password: '',
                    error: 'Identifiants erronés'
                }));

            });
    };

    return (
        <View
            email={state.email}
            password={state.password}
            error={state.error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetPassword={resetPassword}
        />
    );
};

export default Login;