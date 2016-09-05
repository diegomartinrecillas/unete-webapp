import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, hashHistory } from 'react-router'

import Shell from './Shell';
import Login from './Login';
import Registro from './Registro';
import Ayuda from './Ayuda';
import Error from './Error';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#D78500',
        accent1Color: '#00407A'
    }
});

export default class Main extends React.Component {

    requireAuth = (nextState, replace) => {
        // replace ({
        //     pathname: '/error',
        //     state: { nextPathname: nextState.location.pathname }
        // })
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={Shell}>
                        <Route path="/login" component={Login} onEnter={this.requireAuth}/>
                        <Route path="/registro" component={Registro}/>
                        <Route path="/ayuda" component={Ayuda}/>
                        <Route path="/error" component={Error}/>
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}
