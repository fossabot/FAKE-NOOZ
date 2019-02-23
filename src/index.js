import React from 'react';
import { hydrate, render } from 'react-dom';
import Loadable from 'react-loadable';
import * as serviceWorker from './serviceWorker';
import App from './components/App';

const rootElement = document.getElementById('root');

Loadable.preloadReady().then(() =>
    rootElement.hasChildNodes()
        ? hydrate(<App />, rootElement)
        : render(<App />, rootElement)
);

// Service Worker
// https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
serviceWorker.unregister();
