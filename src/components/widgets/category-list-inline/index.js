import React, {useState} from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";

/**
 * source: https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
 * @param element
 * @returns {boolean}
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Checks if element is at the left-end of the screen
 * @param element
 * @returns {boolean}
 */
function isLeftest(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.width > rect.left
    );
}

/**
 * Checks if element is at the right-end of the screen
 * @param element
 * @returns {boolean}
 */
function isRightest(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.width > (document.documentElement.clientWidth - rect.right)
    );
}


export const CategoryListInline = (
    {
        id = 0,
        name = 'Ceci est un nom',
        entries = []
    }) => {

    const [selectedTimeout, setSelectedTimeout] = useState()

    const handleMouseEnter = (event) => {
        const {target} = event
        const infos = target.querySelector('[aria-label="Informations sur le documentaire selectionné"]')

        if (!isInViewport(target)) return

        setSelectedTimeout(setTimeout(function () {
            target.setAttribute('aria-current', 'true')
            infos.setAttribute('aria-hidden', 'false')

            if (isLeftest(target)) {
                target.setAttribute('data-leftest', 'true')
                return
            }

            if (isRightest(target)) {
                target.setAttribute('data-rightest', 'true')
            }
        }, 575))
    }

    const handleMouseLeave = (event) => {
        const {target} = event
        if (selectedTimeout) clearTimeout(selectedTimeout)
        target.setAttribute('aria-current', 'false');
    }

    return (
        <section
            aria-labelledby={"category-" + id}
            role="presentation">
            <p id={"category-" + id}>{name}</p>

            <div role="contentinfo">

                <div
                    role="list"
                    aria-label="Liste de documentaires">

                    {entries.map(({name,author}) => {
                        return (
                            <article
                                role="listitem"
                                aria-current="false"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>

                                <div
                                    aria-label={name}
                                    role="contentinfo">

                                    <p aria-label="Titre">{name}</p>
                                </div>

                                <div
                                    aria-hidden="true"
                                    aria-label="Informations sur le documentaire selectionné">

                                    <p>Coucou ceci est un texte</p>

                                </div>

                            </article>
                        )
                    })}
                </div>

                <div
                    role="list"
                    aria-label="Contrôles de la liste">

                    <article role="listitem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </article>
                    <article role="listitem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </article>
                </div>


            </div>
        </section>
    );
};
export default CategoryListInline
