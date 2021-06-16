import React, {useState} from 'react'
import styles from './index.module.scss'
import {Link} from "react-router-dom"
import {CategoryListInline} from '../../widgets/category-list-inline'

const Home = () => {
    return (
        <>
            {/* Section d'entête */}
            <section
                className={styles.documentaires_featured}
                aria-label="Documentaire mis en avant"
                role="presentation">

                <div
                    aria-label="Informations sur le documentaire"
                    role="contentinfo">

                    <p aria-label="Titre">
                        Ceci est un titre
                    </p>
                    <p aria-label="Auteur">
                        Par Ulysse ARNAUD
                    </p>
                    <p aria-label="Description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab aspernatur dicta dolore eligendi eos facilis fugit nulla
                        porro praesentium! Quod.
                    </p>

                    <div>
                        <button>Voir</button>
                        <button>Détails</button>
                    </div>
                </div>

            </section>

            <section
                aria-label="Catégories mises en avant"
                className={styles.categories}>

                <CategoryListInline
                    category={{
                        id: 1,
                        name: 'Oiseaux d\'Europe'
                    }}
                    entries={[
                        {
                            name: 'Documentaire 1',
                            author: 'Ulysse ARNAUD'
                        },
                        {
                            name: 'Documentaire 2',
                            author: 'Ulysse ARNAUD'
                        },
                        {
                            name: 'Documentaire 3',
                            author: 'Ulysse ARNAUD'
                        },
                        {
                            name: 'Documentaire 4',
                            author: 'Ulysse ARNAUD'
                        },
                        {
                            name: 'Documentaire 5',
                            author: 'Ulysse ARNAUD'
                        },
                        {
                            name: 'Documentaire 6',
                            author: 'Ulysse ARNAUD'
                        },
                        {
                            name: 'Documentaire 7',
                            author: 'Ulysse ARNAUD'
                        }
                    ]} />

            </section>
        </>
    );
};
export default Home;
