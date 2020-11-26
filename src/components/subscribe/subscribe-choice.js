import React from 'react';

import './subscribe.css';

export default ({ setSubscribe }) => (
  <>
    <h1 className="subscribe_page_header">
      Accédez à la presse en illimité et sans fake news
    </h1>
    <p className="subscribe_page_header subscribe_choice">
      <u> Sans engagement, annulez en un clic.</u>
    </p>

    {new Date(localStorage.getItem('trial_ends_at')) > new Date() ? (
      <>
        <p className="subscribe_page_header subscribe_choice">
          Vous pouvez accéder durant 14 jours à la version limitée, <br />
          ou bénéficier directement d'un mois offert en illimité !
        </p>
        <a href="/">
          {' '}
          <div className="otherwise">
            <p>
              Accédez à la version limitée de Kanar (
              {Math.ceil(
                Math.abs(
                  new Date(localStorage.getItem('trial_ends_at')) - new Date()
                ) /
                  (1000 * 60 * 60 * 24)
              )}{' '}
              jours restants)
            </p>
          </div>
        </a>
        <h4 className="subscribe_page_header">OU</h4>
      </>
    ) : (
      <></>
    )}

    <div className="otherwise black" onClick={() => setSubscribe(true)}>
      <p>Obtenir 30 jours d'essai gratuit</p>
    </div>
  </>
);
