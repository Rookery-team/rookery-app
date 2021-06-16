/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Sticky from 'react-sticky-el';

import { Head } from '../Head';
import { Help } from '../Help';
import { Main } from '../Main';
import Account from './account';
import AntiStress from './antistress';
import BannedKeywords from './banned_keywords';
import Modal from '../Modal';
import SubscriptionSettings from './subscription-settings';
import Themes from './themes';

import './index.css';
import './settings.css';

export default props => (
  <Main>
    <Modal
      show={props.showModal}
      handleConfirm={props.deleteAccount}
      handleCancel={props.toggleModal}
    >
      Souhaitez-vous vraiment supprimer votre compte ? Cette action est
      irréversible.
    </Modal>

    <div className="settings">
      <Head
        title="Mes paramètres"
        content="Gérez ici les paramètres de votre compte !"
      />

      <div className="settings__split">
        <div className="settings__nav">
          <div className="settings__nav__wrap">
            <Sticky>
              <ul>
                <li>
                  <a href="#personnalisation">
                    <span>Préférences</span>
                  </a>
                </li>

                <li>
                  <a href="#notifications">
                    <span>Notifications</span>
                  </a>
                </li>

                <li>
                  <a href="#account">
                    <span>Mon compte</span>
                  </a>
                </li>
              </ul>
            </Sticky>
          </div>
        </div>

        <div className="settings__content">
          <section id="personnalisation">
            <Help
              title="Personnalisation"
              content="Vous pouvez ici paramétrer la manière dont est généré votre flux personnalisé"
            />

            <div className="settings__content__wrap">
              <h2 className="settings__title" id="prefs">
                Thèmes
              </h2>

              <Themes
                preferences={props.preferences}
                setPreferences={props.setPreferences}
              />
            </div>

            <hr />

            <div className="settings__content__wrap">
              <h2 className="settings__title">Filtre anti-stress</h2>

              <p className="settings__help">
                Si vous êtes gênés par le fait de voir trop d'actualités
                négatives sur votre flux, vous avez la possibilité de dire aux
                algorithmes de faire un effort pour rééquilibrer les choses.
              </p>

              <AntiStress props={props} />
            </div>

            <hr />

            <div className="settings__content__wrap">
              <h2 className="settings__title">Mots bloqués</h2>

              <p className="settings-helper">
                Marre de la coupe du monde ? de Game of Thrones ? Bloquez ici
                des mots dont vous ne voulez pas entendre parler
              </p>

              <BannedKeywords
                preferences={props.preferences}
                setPreferences={props.setPreferences}
              />
            </div>
          </section>

          <section id="notifications">
            <Help
              title="Notifications"
              content="Vous pouvez choisir combien de notifications push vous souhaitez
                recevoir par mois"
            />

            <div className="settings__content__wrap">
              <h2 className="settings__title">Notifications partenaires</h2>

              <p className="settings-helper">
                Kanar n'autorise pas ses partenaires à accéder à vos données
                personnelles. Il leur est toutefois possible de vous envoyer du
                contenu directement sur votre flux. Par défaut, vous pouvez
                recevoir jusqu'à 5 notifications par mois de la part de
                créateurs de contenu que vous suivez régulièrement. Il est
                possible ici de réduire ce nombre.
              </p>
              <p>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="5"
                  value={
                    props.preferences.preferences.notifications
                      .max_contact_per_month
                  }
                  onChange={props.handlePartnerNotifChange}
                />
              </p>
            </div>
          </section>

          <section id="language">
            <Help
              title="Langue"
              content="Choisissez les langues des contenus qui vous seront proposés"
            />

            <div className="settings__content__wrap">
              <h2 className="settings__title">Langues</h2>

              <p className="settings-helper">
                Choisissez les langues des contenus qui vous seront proposés
              </p>
              <p>
                <select
                  id="languages"
                  value={
                    props.preferences.preferences.languages.length === 1
                      ? 'fr'
                      : 'fr+en'
                  }
                  onChange={props.handleLanguageChange}
                >
                  <option value="fr">Français uniquement</option>
                  <option value="fr+en">Français et anglais</option>
                </select>
              </p>
            </div>
          </section>

          <section id="account">
            <div className="settings__content__wrap">
              <h2>Compte</h2>

              <Account props={props} />

              <br />
              <SubscriptionSettings
                token={props.token}
                subscriptionPrefs={props.subscriptionPrefs}
              />

              <br />
              <p>
                <a
                  href={
                    process.env.REACT_APP_BACK_URL +
                    '/user/download-data/' +
                    props.token
                  }
                >
                  Télécharger mon fichier de données personnelles
                </a>
              </p>
              <p className="deleteAccount" onClick={props.toggleModal}>
                Supprimer mon compte
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </Main>
);
