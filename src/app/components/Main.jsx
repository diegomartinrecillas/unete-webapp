// React
import React from 'react';
// React Router
import { Redirect, Router, Route, hashHistory } from 'react-router'
// Libraries and Helpers
import requireAuth from 'app/firebase/auth';
// Material UI Components
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// App Components
import AppShell from './app_shell/AppShell';
import RootShell from './root_shell/RootShell';
import Login from './login/Login';
import Registro from './registro/Registro';
import RegistroInicio from './registro/RegistroInicio';
import RegistroDatos from './registro/RegistroDatos';
import Ayuda from './ayuda/Ayuda';
import Error from './error/Error';
import Chat from './chat/Chat';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#D78500',
        accent1Color: '#00407A'
    }
});

export default class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Redirect from="/" to="/login" />
                    <Route path="/" component={RootShell} >
                        <Route path="/login" component={Login}/>
                        <Route path="/registro" component={Registro}>
                            <Route path="/registro/inicio" component={RegistroInicio}/>
                            <Route path="/registro/datos" component={RegistroDatos}/>
                        </Route>
                        <Route path="/ayuda" component={Ayuda}/>
                        <Route path="/error" component={Error}/>
                        <Route path="/app" component={AppShell} onEnter={requireAuth}>
                            <Route path="/app/chat" component={Chat}/>
                        </Route>
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}
