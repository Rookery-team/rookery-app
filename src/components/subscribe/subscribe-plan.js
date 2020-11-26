import React from 'react';

import './subscribe.css';

export default ({ handleClick }) => (
  <>
    <h1 className="subscribe_page_header">Choisissez votre abonnement</h1>

    <div className="otherwise">
      <input
        id="student"
        onClick={handleClick}
        type="button"
        value="Je suis étudiant - 5€ / mois (abonnement Solo)"
      />
    </div>
    <div className="subscribe">
      <div className="subscribe_type">
        <div className="subscribe_type_header">Solo</div>
        <div className="subscribe_type_body">
          <div className="subtype">
            <div className="sub">
              <ul className="listsub">
                <li>
                  <p>1 profil</p>
                </li>

                <li>
                  <p>Articles et vidéos en illimité</p>
                </li>

                <li>
                  <p>Accès hors-ligne</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="subscribe_type_footer">
          <input
            type="button"
            id="solo"
            onClick={handleClick}
            value="10€ / mois"
            className="btn active"
          />
        </div>
      </div>
      <div className="subscribe_type">
        <div className="subscribe_type_header">Duo</div>
        <div className="subscribe_type_body">
          <div className="subtype">
            <div className="sub">
              <ul className="listsub">
                <li>
                  <p>2 profils</p>
                </li>

                <li>
                  <p>Articles et vidéos en illimité</p>
                </li>

                <li>
                  <p>Accès hors-ligne</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="subscribe_type_footer">
          <input
            type="button"
            id="duo"
            onClick={handleClick}
            value="12€ / mois"
            className="btn"
          />
        </div>
      </div>
      <div className="subscribe_type">
        <div className="subscribe_type_header">Famille</div>
        <div className="subscribe_type_body">
          <div className="subtype">
            <div className="sub">
              <ul className="listsub">
                <li>
                  <p>5 profils</p>
                </li>

                <li>
                  <p>Articles et vidéos en illimité</p>
                </li>

                <li>
                  <p>Accès hors-ligne</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="subscribe_type_footer">
          <input
            type="button"
            id="famille"
            onClick={handleClick}
            value="15€ / mois"
            className="btn"
          />
        </div>
      </div>
    </div>
  </>
);
