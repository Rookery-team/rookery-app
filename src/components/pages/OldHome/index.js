import logo from '../../assets/logo.svg';
import './index.scss';

let timeout;

function defineTimeout (params) {

    const defaultParams = {
        id: undefined,
        callback: undefined,
        scope: document,
        delay: 500,
    }

    params = { ...defaultParams, ...params }

    const { id, callback, scope, delay } = params

    const element = scope.querySelector(`[data-id="${ id }"]`)

    if ( !!timeout ) {
        timeout.callback(element)
    }

    const _timeout = setTimeout(() => callback(element), delay);

    timeout = { id, callback, element, scope, _timeout };

}

function removeTimeout () {

    if ( !timeout ) return;

    timeout.callback(timeout.element);

    clearTimeout(timeout._timeout);

    timeout = undefined;

}

function onMouseOverMenuEntry (event) {

    event.preventDefault();

    let { target: element } = event;

    if (
        'li' !== element.nodeName.toLowerCase()
        || !element.hasOwnProperty('aria-label')
        || (
            element.hasOwnProperty('aria-label') && 'Menu entry' === element.getAttribute('aria-label')
        )
    ) {
        element = element.closest('li[aria-label="Menu entry"]');
    }

    removeTimeout()

    callback(element)

    function callback (element) {

        const navigation = element.closest('nav')

        // On enlève le précédent élément active de la navigation (si celui-ci ne correspond à celui survolé)
        const currentActive = navigation.querySelector('[aria-label^="Menu "] > li.active');
        if ( currentActive && currentActive !== element ) {
            currentActive.classList.remove('active')
        }

        // Si c'est un dropdown...
        if ( element.classList.contains('dropdown') ) {
            element.classList.add('active')

            const caret = element.querySelector('.caret')
            caret.classList.add('open')
        }
    }

    return true;
}

function onMouseLeaveMenuEntry (event) {
    event.preventDefault();

    let { target: element } = event;

    if (
        'li' !== element.nodeName.toLowerCase()
        || !element.hasOwnProperty('aria-label')
        || (
            element.hasOwnProperty('aria-label') && 'Menu entry' === element.getAttribute('aria-label')
        )
    ) {
        element = element.closest('li[aria-label="Menu entry"]');
    }

    callback(element);

    function callback (element) {
        const { id } = element.dataset;

        defineTimeout({
            id,
            scope: element.closest('nav'),
            callback: onTimeoutMenuEntry,
        });
    }
}

function onTimeoutMenuEntry (element) {
    // Si c'est un dropdown...
    if ( element.classList.contains('dropdown') ) {
        element.classList.remove('active');

        const caret = element.querySelector('.caret');
        caret.classList.remove('open');
    }
}

function Home () {
    return (
        <div aria-label="App">

            <nav role="navigation" aria-label="Navigation bar">

                <img src={ logo } alt="Rookery" aria-label="Logo"/>

                <ul aria-label="Menu left">

                    <li
                        aria-label="Menu entry"
                        data-id="S2lKXxgr"
                    >
                        <span>Accueil</span>
                    </li>

                    <li
                        aria-label="Menu entry"
                        data-id="1kS7Ep9B"
                    >
                        <span>Ma liste</span>
                    </li>

                </ul>

                <ul aria-label="Menu right">
                    <li
                        aria-label="Menu entry"
                        className="dropdown user"
                        data-id="Jr1e4q4A"
                        onMouseOver={ onMouseOverMenuEntry }
                        onMouseLeave={ onMouseLeaveMenuEntry }
                    >
                        <img
                            src="https://picsum.photos/64/64"
                            alt="Avatar"
                            aria-label="Avatar"
                        />

                        <span
                            className="caret"
                            role="presentation"
                        />

                        <ul>
                            <li>Compte</li>
                            <li>Centre d'aide</li>
                            <li>Se déconnecter</li>
                        </ul>
                    </li>
                    <li
                        aria-label="Menu entry"
                        className="dropdown options"
                        data-id="RuKiyRMG"
                        onMouseOver={ onMouseOverMenuEntry }
                        onMouseLeave={ onMouseLeaveMenuEntry }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M490.667 405.333h-56.811C424.619 374.592 396.373 352 362.667 352s-61.931 22.592-71.189 53.333H21.333C9.557 405.333 0 414.891 0 426.667S9.557 448 21.333 448h270.144c9.237 30.741 37.483 53.333 71.189 53.333s61.931-22.592 71.189-53.333h56.811c11.797 0 21.333-9.557 21.333-21.333s-9.535-21.334-21.332-21.334zm-128 53.334c-17.643 0-32-14.357-32-32s14.357-32 32-32 32 14.357 32 32-14.358 32-32 32zM490.667 64h-56.811c-9.259-30.741-37.483-53.333-71.189-53.333S300.736 33.259 291.477 64H21.333C9.557 64 0 73.557 0 85.333s9.557 21.333 21.333 21.333h270.144C300.736 137.408 328.96 160 362.667 160s61.931-22.592 71.189-53.333h56.811c11.797 0 21.333-9.557 21.333-21.333S502.464 64 490.667 64zm-128 53.333c-17.643 0-32-14.357-32-32s14.357-32 32-32 32 14.357 32 32-14.358 32-32 32zM490.667 234.667H220.523c-9.259-30.741-37.483-53.333-71.189-53.333s-61.931 22.592-71.189 53.333H21.333C9.557 234.667 0 244.224 0 256c0 11.776 9.557 21.333 21.333 21.333h56.811c9.259 30.741 37.483 53.333 71.189 53.333s61.931-22.592 71.189-53.333h270.144c11.797 0 21.333-9.557 21.333-21.333.001-11.776-9.535-21.333-21.332-21.333zM149.333 288c-17.643 0-32-14.357-32-32s14.357-32 32-32 32 14.357 32 32-14.357 32-32 32z"/>
                        </svg>

                        <span
                            className="caret"
                            role="presentation"
                        />

                        <ul>
                            {/*<li>Un lien</li>*/ }
                        </ul>
                    </li>
                </ul>
            </nav>

            <section aria-label="Main section">

                <img
                    src=""
                    alt="Something with birds and something else"
                    aria-label="Main section's background"
                />

                <div role="contentinfo">

                    <p aria-label="Documentary's title">Ceci est un titre</p>
                    <p aria-label="Documentary's author">Par <span>Ulysse ARNAUD</span></p>
                    <p aria-label="Documentary's description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Ab aspernatur dicta dolore eligendi eos facilis fugit nulla porro praesentium! Quod.</p>

                    <ul aria-label="Actions">
                        <li>
                            <button>Voir</button>
                        </li>
                        <li>
                            <button>Détails</button>
                        </li>
                    </ul>
                </div>

            </section>

            <section aria-label="Categories list" role="list">

                <section aria-label="Oiseaux d'Europe" role="listitem">
                    <p aria-label="Title of category">Oiseaux d'Europe</p>
                    <ul aria-label="Entries of category" role="grid">
                        <li role="gridcell">Documentaire 1</li>
                        <li role="gridcell">Documentaire 2</li>
                        <li role="gridcell">Documentaire 3</li>
                        <li role="gridcell">Documentaire 4</li>
                        <li role="gridcell">Documentaire 5</li>
                        <li role="gridcell">Documentaire 6</li>
                        <li role="gridcell">Documentaire 7</li>
                        <li role="gridcell">Documentaire 8</li>
                    </ul>
                </section>

                <section aria-label="Rookeries" role="listitem">
                    <p aria-label="Title of category">Rookeries</p>
                    <ul aria-label="Entries of category" role="grid">
                        <li role="gridcell">Documentaire 1</li>
                        <li role="gridcell">Documentaire 2</li>
                        <li role="gridcell">Documentaire 3</li>
                        <li role="gridcell">Documentaire 4</li>
                        <li role="gridcell">Documentaire 5</li>
                        <li role="gridcell">Documentaire 6</li>
                        <li role="gridcell">Documentaire 7</li>
                        <li role="gridcell">Documentaire 8</li>
                    </ul>
                </section>

            </section>

        </div>
    );
}

export default Home;