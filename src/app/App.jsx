import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './components/Main'; // Main component, holds the whole App
import AppStore from './stores/AppStore'; // AppStore, holds APP_INIT business logic

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Stylesheets for development, comment for production build
require('../stylesheets/main.scss');

// Render Main in the app container
ReactDOM.render(<Main />, document.getElementById('app'));
