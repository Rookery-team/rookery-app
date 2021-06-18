import React, {useState, useEffect} from 'react';
import styles from './index.module.scss';
import {Link} from "react-router-dom";


export const NavbarDropdown = (
    {
        id = 0,
        name = null,
        icon = null,
        image = null,
        entries = []
    }) => {

    let [hoverTimeout, setHoverTimeout] = useState(null)
    let [mouseOutTimeout, setMouseOutTimeout] = useState(null)

    const openDropdown = (target) => {

        const elementName = target.getAttribute('data-element-name')

        if ('navbar-dropdown' !== elementName) {
            target = target.closest('[data-element-name="navbar-dropdown"]')
        }

        const {active} = target.dataset
        target.setAttribute('data-active', 'true')
        const caret = target.querySelector('[class*="dropdown_caret"]')
        caret.setAttribute('data-active', 'true')
    }

    const closeDropdown = (target) => {

        const elementName = target.getAttribute('data-element-name')

        if ('navbar-dropdown' !== elementName) {
            target = target.closest('[data-element-name="navbar-dropdown"]')
        }

        const {active} = target.dataset
        target.setAttribute('data-active', 'false')
        const caret = target.querySelector('[class*="dropdown_caret"]')
        caret.setAttribute('data-active', 'false')
    }

    const isDropdownActive = (target) => {
        const elementName = target.getAttribute('data-element-name')

        if ('navbar-dropdown' !== elementName) {
            target = target.closest('[data-element-name="navbar-dropdown"]')
        }

        return 'true' === target.dataset.active
    }

    const handleMouseOver = (event) => {
        const {target} = event

        setHoverTimeout(setTimeout(() => openDropdown(target), 500))

        if (!mouseOutTimeout) return

        clearTimeout(mouseOutTimeout)

        setMouseOutTimeout(null)
    }

    const handleClick = (event) => {
        const {target} = event

        if (!isDropdownActive(target)) {
            openDropdown(target)

            if (!mouseOutTimeout) {
                clearTimeout(mouseOutTimeout)
                setMouseOutTimeout(null)
            }

            return
        }

        closeDropdown(target)

        if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setHoverTimeout(null)
        }
    }

    const handleMouseOut = (event) => {

        const {target} = event

        setMouseOutTimeout(setTimeout(() => closeDropdown(target), 500))

        if (!hoverTimeout) return

        clearTimeout(hoverTimeout)

        setHoverTimeout(null)
    }

    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={styles.dropdown}
            data-element-name="navbar-dropdown"
            aria-labelledby={"navbar-dropdown-" + id}
            role="presentation">
            <p id={"navbar-dropdown-" + id}>
                {icon && icon}
                {(!icon && image) && image}
                <span>{name}</span>
                <span
                    className={styles.caret}
                    aria-hidden="true"
                ></span>
            </p>
            <ul>
                {entries.map(entry => (<li>
                    {entry}
                </li>))}
            </ul>
        </div>
    );
};
export default NavbarDropdown
