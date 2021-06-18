import React, {useState} from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <>
            {/* Section entête */}
            <header className={styles.header}>
                {/* Container */}
                <div>

                    {/* Slogan */}
                    <p aria-label="Slogan">
                        Retrouver nos&nbsp;incroyables documentaires
                    </p>
                    <p>
                        A&nbsp;tout&nbsp;moment, où&nbsp;que vous&nbsp;soyez
                    </p>

                    {/* Input group */}
                    <form name="get-started">
                        <input type="email" />
                        <button>Commencer</button>
                    </form>

                </div>
            </header>

            {/* Section fonctionnalité */}
            <section className={styles.features}>

                {/* Feature */}
                <div className={styles.feature}>
                    {/* Container */}
                    <div className={styles.feature_container}>

                        {/* Content */}
                        <div className={styles.feature_content}>
                            {/* Title */}
                            <span className={styles.feature_title}>Regarder&nbsp;Rookery sur&nbsp;votre&nbsp;télé</span>
                            {/* Subtitle */}
                            <span className={styles.feature_subtitle}>Regarder&nbsp;sur votre&nbsp;télé, ordinateur, téléphones et&nbsp;bien&nbsp;plus encore</span>
                        </div>

                        {/* Image */}
                        <div className={styles.feature_image}>
                            <img src="http://picsum.photos/1024/576" alt="" />
                        </div>
                    </div>
                </div>

                {/* Feature even */}
                <div className={styles.featureEven}>
                    {/* Container */}
                    <div className={styles.featureEven_container}>

                        {/* Content */}
                        <div className={styles.featureEven_content}>
                            {/* Title */}
                            <span className={styles.featureEven_title}>Profiter des&nbsp;documentaires</span>
                            {/* Subtitle */}
                            <span className={styles.featureEven_subtitle}>où&nbsp;que vous&nbsp;soyez</span>
                        </div>

                        {/* Image */}
                        <div className={styles.featureEven_image}>
                            <img src="http://picsum.photos/1024/576" alt="" />
                        </div>
                    </div>
                </div>

                {/* Feature alternative */}
                <div className={styles.featureAlternative}>
                    {/* Container */}
                    <div className={styles.feature_container}>

                        {/* Content */}
                        <div className={styles.feature_content}>
                            {/* Title */}
                            <span className={styles.feature_title}>Rejoignez<br />la communauté</span>
                            {/* Subtitle */}
                            <span className={styles.feature_subtitle}>
                                en&nbsp;partageant votre&nbsp;avis et en&nbsp;discutant&nbsp;sur le&nbsp;fil&nbsp;d'actualité
                            </span>
                        </div>

                    </div>
                </div>

                {/* Feature even */}
                <div className={styles.featureEven}>
                    {/* Container */}
                    <div className={styles.featureEven_container}>

                        {/* Content */}
                        <div className={styles.featureEven_content}>
                            {/* Title */}
                            <span className={styles.featureEven_title}>
                                Participer aux&nbsp;cagnottes
                            </span>
                            {/* Subtitle */}
                            <span className={styles.featureEven_subtitle}>
                                et&nbsp;sauver des&nbsp;oiseaux en&nbsp;voie de&nbsp;disparition
                            </span>
                        </div>

                        {/* Image */}
                        <div className={styles.featureEven_image}>
                            <img src="http://picsum.photos/1024/576" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Welcome;
