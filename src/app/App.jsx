import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Import the App main component
import AppRouter from './components/AppRouter'; // Main component, holds the whole App
// Initalize Stores Singletons
import UserStore from 'app/stores/UserStore';
import LoginStore from 'app/stores/LoginStore';
import SignUpStore from 'app/stores/SignUpStore';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Stylesheets for development, comment for production build
import '../stylesheets/main.scss';

// Render Main in the app container
ReactDOM.render(<AppRouter />, document.getElementById('app'));
