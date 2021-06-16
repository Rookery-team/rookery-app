import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../Modal';
import { useEffect } from 'react';

const SubscriptionSettings = props => {
  const cancelSubscription = () => {
    fetch(process.env.REACT_APP_BACK_URL + '/api/subscription/cancel', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
      });
  };

  const resumeSubscription = () => {
    fetch(process.env.REACT_APP_BACK_URL + '/api/subscription/resume', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + props.token
      },
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        window.location.reload();
      });
  };

  const [showModal, setShowModal] = useState(false);
  const toggleModal = event => {
    event.preventDefault();
    setShowModal(!showModal);
  };

  const plan = localStorage.getItem('plan');
  var [endsIn, setEndsIn] = useState(0);
  useEffect(() => {
    if (plan === 'trial') {
      setEndsIn(
        Math.ceil(
          Math.abs(
            new Date(localStorage.getItem('trial_ends_at')) - new Date()
          ) /
            (1000 * 60 * 60 * 24)
        )
      );
    }
  }, [plan]);

  return (
    <>
      <Modal
        show={showModal}
        handleConfirm={cancelSubscription}
        handleCancel={toggleModal}
      >
        Souhaitez-vous vraiment annuler le renouvellement de votre abonnement ?
      </Modal>
      <div className="greyBackground">
        <h4>Abonnement</h4>

        {localStorage.getItem('subscribed') === 'true' ? (
          <>
            {localStorage.getItem('plan') === 'trial' ? (
              <p>
                Vous êtes en période d'essai. Il vous reste {endsIn} jour(s)
                d'essai. <br />
                <Link to="/subscribe">
                  <strong>
                    Abonnez-vous et profitez de d'un mois gratuit supplémentaire
                    et d'un accès intégral à la plateforme
                  </strong>
                </Link>
                <Link className="btn" to="/subscribe">
                  M'abonner
                </Link>
              </p>
            ) : (
              <>
                <p>
                  Prochain renouvellement de mon abonnement :
                  {props.subscriptionPrefs.nextUserPayment}
                </p>
                <p>
                  {props.subscriptionPrefs.onGracePeriod ? (
                    <a href="#" onClick={resumeSubscription}>
                      Reprendre mon abonnement
                    </a>
                  ) : (
                    <a href="#" onClick={toggleModal} className="cancelSub">
                      Annuler le renouvellement de mon abonnement
                    </a>
                  )}
                </p>
              </>
            )}
          </>
        ) : (
          <p>Vous n'êtes pas abonnés</p>
        )}
      </div>
    </>
  );
};
export default SubscriptionSettings;
