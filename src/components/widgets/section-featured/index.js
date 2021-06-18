import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import {Link, useHistory} from "react-router-dom";


export const SectionFeatured = ({
                                    id,
                                    name,
                                    thumbnail,
                                    author,
                                    description,
                                    uri,
                                }
) => {

    const history = useHistory()

    const thumbnailStyle = {
        backgroundImage: `linear-gradient(to right, #000C 0%, #000C 35%, transparent 100%), url(${thumbnail})`
    }

    return (
        <section
            style={thumbnailStyle}
            className={styles.documentaires_featured}
            aria-label="Documentaire mis en avant"
            role="presentation">

            <div
                aria-label="Informations sur le documentaire"
                role="contentinfo">

                <p aria-label="Titre">
                    {name}
                </p>
                <p aria-label="Auteur">
                    Par <span>{author}</span>
                </p>
                <p aria-label="Description">
                    {description}
                </p>

                <div>
                    <button
                        onClick={() => {
                            history.push('/watch/' + id)
                        }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd" />
                        </svg>
                        Voir
                    </button>
                    <button
                        onClick={() => {
                            alert('Fonctionnalité en cours d\'implémentation')
                        }}>
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
    )
}

export default SectionFeatured
