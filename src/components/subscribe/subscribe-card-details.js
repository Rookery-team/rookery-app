import React, { useState } from 'react';
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider
} from 'react-stripe-elements';

import './subscribe.css';

const CheckoutForm = ({
  stripe,
  clientSecret,
  handleSetupIntent,
  error,
  setError,
  handleFileChange,
  slug
}) => {
  const [cardElement, setCardElement] = useState(null);

  const handleSubmit = async () => {
    setError(null);

    const cardholderName = document.querySelector('#card-holder-name');
    const coupon = document.querySelector('#coupon');

    const { setupIntent, error } = await stripe.handleCardSetup(
      clientSecret,
      cardElement,
      {
        payment_method_data: {
          billing_details: {
            name: cardholderName.value
          }
        }
      }
    );

    if (error) {
      setError(error.message);
    } else {
      handleSetupIntent(setupIntent.payment_method, coupon.value);
    }
  };

  const handleReady = element => {
    setCardElement(element);
  };

  return (
    <>
      <h1 className="subscribe_page_header">Informations de paiement</h1>
      <div className="checkout">
        {slug === 'student' ? (
          <>
            {' '}
            <p>Commencez par uploader un certificat valide de scolarité</p>
            <input
              type="file"
              id="student_proof"
              name="student_proof"
              onChange={handleFileChange}
            />
          </>
        ) : (
          <></>
        )}
        <p id="error">
          <strong>{error}</strong>
        </p>

        <p>
          <input
            id="card-holder-name"
            placeholder="Propriétaire de la carte"
            type="text"
          />
        </p>
        <p>
          <input id="coupon" placeholder="Code promo" type="text" />
        </p>

        <CardElement onReady={handleReady} />

        <p>
          <button id="card-button" className="btn" onClick={handleSubmit}>
            Commencer mon mois gratuit
          </button>
        </p>
      </div>
    </>
  );
};

const InjectedForm = injectStripe(CheckoutForm);

const Provider = ({
  clientSecret,
  handleSetupIntent,
  error,
  setError,
  handleFileChange,
  slug
}) => {
  return (
    <StripeProvider apiKey={process.env.REACT_APP_PUBLIC_KEY_STRIPE}>
      <Elements>
        <InjectedForm
          clientSecret={clientSecret}
          handleSetupIntent={handleSetupIntent}
          error={error}
          setError={setError}
          handleFileChange={handleFileChange}
          slug={slug}
        />
      </Elements>
    </StripeProvider>
  );
};

export default Provider;
