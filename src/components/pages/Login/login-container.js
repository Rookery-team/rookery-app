import React, {useState} from 'react'
import ReactDOM from 'react-dom'

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
        fetch(process.env.REACT_APP_BACK_URL + 'app/reset/password', {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                email: state.email
            })
        }).then(() => {
            setState(current => ({
                ...current,
                error:
                    'Si votre compte existe, ' +
                    'un email vous a été envoyé ' +
                    'avec des indications ' +
                    'pour récupérer votre mot de passe'
            }));
        }).catch(() => {
            setState(current => ({
                ...current,
                error:
                    'Une erreur est survenue lors de la requête. ' +
                    'Veuillez ressayer plus tard.'
            }));
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        setState(current => ({...current, error: ''}));

        const loadingScreen = document.querySelector('[aria-label="Loading Screen"]')

        loadingScreen.classList.remove('hidden')

        fetch(process.env.REACT_APP_BACK_URL + 'api/login_check', {
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Max-Age': 600
            },
            method: 'POST',
            body: JSON.stringify({
                username: state.email,
                password: state.password,
                // client_id: process.env.REACT_APP_CLIENT_ID,
                // client_secret: process.env.REACT_APP_CLIENT_SECRET
            }),
            // redirect: 'follow'
        })
            .then(response => response.json())
            .then(session => {

                const {ok} = session

                if (ok) {
                    handleUserSession(session); // Will redirect
                    return;
                }

                setState(current => ({
                    ...current,
                    password: '',
                    error: 'Identifiants erronés'
                }));

            }).catch(() => {
            setState(current => ({
                ...current,
                error:
                    'Une erreur est survenue lors de la requête. ' +
                    'Veuillez ressayer plus tard.'
            }));
        })
            .finally(() => {
                loadingScreen.classList.add('hidden')
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
