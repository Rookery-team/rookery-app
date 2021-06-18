import React, {useState} from 'react';
// import styles from './index.module.scss';
import {Link, useHistory} from "react-router-dom";

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

function resetListsInDocument() {
    const currentItemsInAllLists =
        document.querySelectorAll(
            '[data-element-name="category-list-inline"] [role="listitem"][aria-current="true"]'
        )

    Array.from(currentItemsInAllLists).map(resetListFromTarget)
}

function resetListFromTarget(target) {
    const list = target.closest('[role="list"]')
    let element
    while (element = list.querySelector('[aria-current="true"]')) {
        unselectItem(element)
    }
}

function unselectItem(target) {
    const infos = target.querySelector('[aria-label="Informations sur le documentaire selectionné"]')
    target.setAttribute('aria-current', 'false')
    target.removeAttribute('data-leftest');
    target.removeAttribute('data-rightest');


    if (infos) infos.setAttribute('aria-hidden', 'true')
}

function selectItem(target) {
    const infos = target.querySelector('[aria-label="Informations sur le documentaire selectionné"]')

    target.setAttribute('aria-current', 'true')
    if (infos) infos.setAttribute('aria-hidden', 'false')

    if (isLeftest(target)) {
        target.setAttribute('data-leftest', 'true')
        return
    }

    if (isRightest(target)) {
        target.setAttribute('data-rightest', 'true')
    }
}


export const CategoryListInlineItem = (
    {
        id = 0,
        name = 'Ceci est un nom',
        author = 'Ulysse ARNAUD',
        description = 'Ceci est une description'
    }) => {

    const [selectedTimeout, setSelectedTimeout] = useState()

    const history = useHistory();

    const handleClick = (event) => {
        const rootElement = document.getElementById('root')
        rootElement.setAttribute('data-zoom', 'true')
        setTimeout(() => {
            rootElement.setAttribute('data-zoom', 'false')
            history.push('/watch/' + id)
        }, 2000)
    }

    const handleMouseEnter = (event) => {
        const {target} = event

        // resetListFromTarget(target)

        resetListsInDocument()

        if (!isInViewport(target)) return

        setSelectedTimeout(setTimeout(function () {
            selectItem(target)
        }, 575))
    }

    const handleMouseLeave = (event) => {
        const {target} = event
        if (selectedTimeout) clearTimeout(selectedTimeout)
        unselectItem(target)
    }

    return (
        <article
            role="listitem"
            aria-current="false"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}>

            <div
                aria-label={name}
                role="presentation">

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
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <aside
                aria-hidden="true"
                aria-label="Informations sur le documentaire selectionné"
                role="contentinfo">

                <p aria-label="Titre">
                    {name}
                </p>

                <p aria-label="Auteur">
                    Par :
                    <span>{author}</span>
                </p>

                <p aria-label="Synopsis">
                    {description}
                </p>

            </aside>

        </article>
    );
};
export default CategoryListInlineItem
