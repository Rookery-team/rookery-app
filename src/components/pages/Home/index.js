import React, {useState} from 'react'
import styles from './index.module.scss'
import {Link} from "react-router-dom"
import {CategoryListInline} from '../../widgets/category-list-inline'
import {NavbarDropdown} from "../../widgets/navbar-dropdown";

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
                        Par <span>Ulysse ARNAUD</span>
                    </p>
                    <p aria-label="Description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab aspernatur dicta dolore eligendi eos facilis fugit nulla
                        porro praesentium! Quod.
                    </p>

                    <div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            Voir
                        </button>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Plus d'infos
                        </button>
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
