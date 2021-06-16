import React, { useState, useEffect, useCallback, useRef } from 'react';
import { throttle, debounce } from 'throttle-debounce';

import './settings.css';

import View from './settings-view.js';

const Settings = props => {
  const [status, setStatus] = useState('');

  const [preferences, setPreferences] = useState();
  const [userData, setUserData] = useState();
  const [subscriptionPrefs, setSubscriptionPrefs] = useState();

  const update = useCallback(() => {
    if (!preferences) {
      return;
    }

    var prefs = preferences.preferences;

    if (!preferences.themes_activated) {
      prefs.prop_themes = -1;
    }

    fetch(
      `${process.env.REACT_APP_BACK_URL}/api/settings?profile_id=${props.currentProfile.id}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`
        },
        method: 'PUT',
        body: JSON.stringify({
          preferences: JSON.stringify(prefs)
        })
      }
    )
      .then(res => res.json())
      .then(() => {
        setStatus('Mise à jour réussie !');
      });
  }, [preferences, props.currentProfile.id, props.token]);

  const throttledUpdate = throttle(1000, update);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (!preferences) {
      return;
    }

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    throttledUpdate();
  }, [preferences, throttledUpdate]);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteAccount = () => {
    fetch(`${process.env.REACT_APP_BACK_URL}/api/user`, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.token}`
      },
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        localStorage.clear();
        window.location.reload();
      });
  };

  const handlePartnerNotifChange = event => {
    event.persist();

    setPreferences(inputs => ({
      ...inputs,
      preferences: {
        ...inputs.preferences,
        notifications: { max_contact_per_month: event.target.value }
      }
    }));
  };

  const handleLanguageChange = event => {
    event.persist();

    setPreferences(inputs => ({
      ...inputs,
      preferences: {
        ...inputs.preferences,
        languages: event.currentTarget.value === 'fr' ? ['fr'] : ['fr', 'en']
      }
    }));
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACK_URL}/api/settings?profile_id=${props.currentProfile.id}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Authorization: `Bearer ${props.token}`
        },
        method: 'GET',
        cache: 'default'
      }
    )
      .then(res => res.json())
      .then(result => {
        var prefs = JSON.parse(result.preferences);

        setUserData({
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          password: '',
          status: ''
        });

        setSubscriptionPrefs({
          onGracePeriod: result.on_grace_period,
          nextUserPayment: result.next_user_payment
        });

        setPreferences(current => ({
          ...current,
          themes_activated: prefs.prop_themes === -1 ? false : true,
          preferences: prefs
        }));
      });
  }, [props.token, props.currentProfile]);

  if (!preferences) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    return (
      <View
        status={status}
        currentProfile={props.currentProfile}
        preferences={preferences}
        setPreferences={setPreferences}
        subscriptionPrefs={subscriptionPrefs}
        userData={userData}
        handlePartnerNotifChange={handlePartnerNotifChange}
        deleteAccount={deleteAccount}
        token={props.token}
        showModal={showModal}
        toggleModal={toggleModal}
        handleLanguageChange={handleLanguageChange}
      />
    );
  }
};

export default Settings;
