import React, {useState, useEffect} from 'react';
import './index.module.scss';
import {Link} from "react-router-dom";
import CategoryListInlineItem from "./list-item";

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

export const CategoryListInline = (
    {
        id = 0,
        name = 'Ceci est un nom',
        entries = []
    }) => {

    const numberVisibleMax = window.innerWidth >= 992 ? 5 : 3;

    let [state, setState] = useState({
        page: 0,
        transform: `translateX(4vw)`,
        list: null,
        showLeftControl: false,
        showRightControl: numberVisibleMax < entries.length
    })

    const handleLeftControlClick = (event) => {
        const {target} = event
        const listControls = target.closest('[role="list"]')
        const listDocumentaires = listControls.previousElementSibling

        setState(previousState => ({
            ...previousState,
            page: previousState.page - 1,
            transform: `translateX(${((previousState.page - 1) * 83) + 4}vw)`,
            showLeftControl: previousState.page - 1 > 1,
            showRightControl: isInViewport(listDocumentaires.querySelector('[role="listitem"]:last-of-type'))
        }))
    }

    const handleRightControlClick = (event) => {
        const {target} = event
        const listControls = target.closest('[role="list"]')
        const listDocumentaires = listControls.previousElementSibling

        setState(previousState => {
            const {page} = previousState
            return ({
                ...previousState,
                page: page + 1,
                transform: `translateX(-${((page + 1) * 83) + 4}vw)`,
                showLeftControl: true,
                showRightControl: isInViewport(listDocumentaires.querySelector('[role="listitem"]:last-of-type'))
            });
        })
    }

    let {list, page, transform, showLeftControl, showRightControl} = state

    return (
        <section
            data-element-name="category-list-inline"
            aria-labelledby={"category-" + id}
            role="presentation">
            <p id={"category-" + id}>{name}</p>

            <div role="contentinfo">

                {<div
                    role="list"
                    data-page={page}
                    style={{transform}}
                    aria-label="Liste de documentaires">

                    {entries.map(({id, name, author, description}) => {
                        return (
                            <CategoryListInlineItem
                                key={Math.floor(Math.random() * Date.now() + 666)}
                                name={name}
                                author={author}
                                description={description}
                            />
                        )
                    })}
                </div>}

                <div
                    role="list"
                    aria-label="Contrôles de la liste">

                    <article
                        aria-label="Aller à gauche"
                        aria-disabled={!showLeftControl}
                        onClick={handleLeftControlClick}
                        role="listitem">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </article>
                    <article
                        aria-label="Aller à droite"
                        aria-disabled={!showRightControl}
                        onClick={handleRightControlClick}
                        role="listitem">
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
