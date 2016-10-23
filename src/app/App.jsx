import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import splitURL from './utils/splitURL';

import AppRouter from './components/AppRouter'; // Main component, holds the whole App

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Stylesheets for development, comment for production build
// import '../stylesheets/main.scss';

// APP object tied to the window so we can pass VERY GLOBAL variables
window.APP = {};

// Remember the last url before security check redirects so we can support refresh inside the app
window.APP.redirectDone = false;
window.APP.targetURL = splitURL(window.location.href);

// Render Main in the app container
ReactDOM.render(<AppRouter />, document.getElementById('app'));
