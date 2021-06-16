import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import PasswordReset from './password-reset';
import Register from './register';
import Login from './login';
import Home from './home';
import Privacy from './cgu/privacy';
import NotFoundPage from './errors/NotFoundPage';
import CGU from './cgu';
import Welcome from './welcome';

const PrivateRoute = ({component: Component, props, ...rest}) => (
    <Route
        {...rest}
        render={currentProps =>
            localStorage.getItem('access_token') ? (
                <Component {...currentProps} {...props} />
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);

const SubscribedRoute = ({component: Component, props, ...rest}) => (
    <Route
        {...rest}
        render={currentProps =>
            localStorage.getItem('subscribed') &&
            localStorage.getItem('subscribed') == 'true' ? (
                <Component {...currentProps} {...props} />
            ) : (
                <Redirect to="/subscribe"/>
            )
        }
    />
);

const RedirectIfAuthentificatedRoute = (
    {
        component: Component,
        props,
        ...rest
    }) => (
    <Route
        {...rest}
        render={currentProps =>
            !localStorage.getItem('access_token') ? (
                <Component {...currentProps} {...props} />
            ) : (
                <Redirect to="/home"/>
            )
        }
    />
);

export default props => (
    <Switch>
        <RedirectIfAuthentificatedRoute
            path="/login"
            exact
            component={Login}
            props={props}
        />

        <RedirectIfAuthentificatedRoute
            path="/register/:invitation"
            exact
            component={Register}
            props={props}
        />

        <RedirectIfAuthentificatedRoute
            path="/password-reset/:token"
            exact
            component={PasswordReset}
            props={props}
        />

        <RedirectIfAuthentificatedRoute
            path="/"
            exact
            component={Welcome}
            props={props}
        />

        {/*TODO : Routes pour les abonnés*/}
        <PrivateRoute path="/home" exact component={Home} props={props} />

        {/*<PrivateRoute path="/settings" exact component={Settings} props={props} />*/}

        {/*<SubscribedRoute path="/search" exact component={Search} props={props} />*/}

        {/*<PrivateRoute path="/subscribe" exact component={Subscribe} props={props} />*/}

        <Route path="/cgu" component={CGU}/>
        <Route path="/privacy" component={Privacy}/>

        <Route path="/404" component={NotFoundPage}/>

        <Redirect to="/404"/>
    </Switch>
);
