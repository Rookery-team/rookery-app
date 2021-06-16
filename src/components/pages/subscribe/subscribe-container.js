import React, { useState } from 'react';

import Plan from './subscribe-plan.js';
import SubscribeChoice from './subscribe-choice.js';
import CardDetails from './subscribe-card-details.js';
import history from '../../../history';
import { useEffect } from 'react';

const Subscribe = ({ token }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [slug, setSlug] = useState(null);
  const [subscribe, setSubscribe] = useState(null);
  const [subError, setSubError] = useState(null);

  const handleClick = event => {
    setSlug(event.target.id);

    fetch(process.env.REACT_APP_BACK_URL + '/api/subscription-intent', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'GET'
    })
      .then(res => res.json())
      .then(result => {
        setClientSecret(result.client_secret);
      });
  };

  const handleSetupIntent = (payment_method, coupon) => {
    fetch(
      process.env.REACT_APP_BACK_URL +
        '/api/subscribe/' +
        slug +
        '/monthly/true',
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: JSON.stringify({
          payment_method: payment_method,
          coupon: coupon
        })
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Moyen de paiment déjà utilisé ou invalide');
        }
      })
      .then(() => {
        fetch(process.env.REACT_APP_BACK_URL + '/api/user/subscription', {
          headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: 'Bearer ' + token
          },
          method: 'GET',
          cache: 'default'
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            localStorage.setItem('subscribed', res.subscribed);
            localStorage.setItem('plan', res.plan);
            history.push('/');
            window.location.reload();
          });
      })
      .catch(error => {
        setSubError(error.message);
      });
  };

  const handleFileChange = selectorFiles => {
    uploadStudentProof(selectorFiles.target.files[0]);
  };

  const uploadStudentProof = file => {
    var formData = new FormData();
    formData.append('student_proof', file);
    fetch(process.env.REACT_APP_BACK_URL + '/api/user/student/upload-proof', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: 'Bearer ' + token
      },
      method: 'POST',
      body: formData
    });
  };

  return (
    <div>
      {clientSecret ? (
        <CardDetails
          clientSecret={clientSecret}
          handleSetupIntent={handleSetupIntent}
          error={subError}
          setError={setSubError}
          handleFileChange={handleFileChange}
          slug={slug}
        />
      ) : subscribe ? (
        <Plan handleClick={handleClick} />
      ) : (
        <SubscribeChoice setSubscribe={setSubscribe} />
      )}
    </div>
  );
};

export default Subscribe;
