import React, {useState} from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <header className={styles.header}>
                <div className={styles.header_container}>
                    <p className={styles.header_mainMessage}>
                        Retrouver nos incroyables<br/>documentaires
                    </p>
                    <p className={styles.header_subMainMessage}>
                        A tout moment, où que vous soyez
                    </p>
                    <div className={styles.header_headerInputGroup}>
                        <input type="email" className={styles.header_headerInput}/>
                        <button>Commencer</button>
                    </div>
                </div>
            </header>
            <section className={styles.features}>
                <div className={styles.feature}>
                    <div className={styles.feature_container}>
                        <div className={styles.feature_content}>
                            <span className={styles.feature_title}>Regarder Rookery<br/>sur votre télé</span>
                            <span className={styles.feature_subtitle}>Regarder sur votre télé, ordinateur,<br />téléphones et bien plus</span>
                        </div>
                        <div className={styles.feature_image}>
                            <img src="http://picsum.photos/1024/576" alt=""/>
                        </div>
                    </div>
                </div>
                <div className={styles.featureEven}>
                    <div className={styles.featureEven_container}>
                        <div className={styles.featureEven_content}>
                            <span className={styles.featureEven_title}>Profiter des<br/>documentaires</span>
                            <span className={styles.featureEven_subtitle}>où que vous soyez</span>
                        </div>
                        <div className={styles.featureEven_image}>
                            <img src="http://picsum.photos/1024/576" alt=""/>
                        </div>
                    </div>
                </div>
                <div className={styles.featureAlternative}>
                    <div className={styles.feature_container}>
                        <div className={styles.feature_content}>
                            <span className={styles.feature_title}>Rejoignez<br/>la communauté</span>
                            <span className={styles.feature_subtitle}>
                                en partageant votre avis<br/>et en discutant sur le fil d'actualité
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.featureEven}>
                    <div className={styles.featureEven_container}>
                        <div className={styles.featureEven_content}>
                            <span className={styles.featureEven_title}>Participer<br/>aux cagnottes</span>
                            <span className={styles.featureEven_subtitle}>
                                et sauver des oiseaux<br/>en voie de disparition
                            </span>
                        </div>
                        <div className={styles.featureEven_image}>
                            <img src="http://picsum.photos/1024/576" alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Welcome;
