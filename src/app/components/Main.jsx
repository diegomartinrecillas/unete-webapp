// React
import React from 'react';
// React Router
import { Redirect, Router, Route, hashHistory } from 'react-router'
// Libraries and Helpers
import requireAuth from 'app/firebase/requireAuth';
// Material UI Components
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// App Components
import AppShell from './app_shell/AppShell';
import Ayuda from './ayuda/Ayuda';
import Chat from './chat/Chat';
import Curp from './curp/Curp';
import Error from './error/Error';
import Home from './home/Home';
import Login from './login/Login';
import Perfil from './perfil/Perfil';
import Registro from './registro/Registro';
import RegistroInicio from './registro/RegistroInicio';
import RegistroDatos from './registro/RegistroDatos';
import Restore from './restore/Restore';
import RestoreFinished from './restore/RestoreFinished';
import RootShell from './root_shell/RootShell';

// Common colors
import { primary, accent } from 'app/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: primary,
        accent1Color: accent
    }
});

export default class Main extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Redirect from="/" to="/login" />
                    <Route path="/" component={RootShell}>
                        <Route path="/login" component={Login}/>
                        <Route path="/restore" component={Restore}/>
                        <Route path="/restore-finished/:email" component={RestoreFinished}/>
                        <Redirect from="/registro" to="/registro/inicio" />
                        <Route path="/registro" component={Registro}>
                            <Route path="/registro/inicio" component={RegistroInicio}/>
                            <Route path="/registro/datos" component={RegistroDatos}/>
                        </Route>
                        <Route path="/ayuda" component={Ayuda}/>
                        <Route path="/error" component={Error}/>
                        <Redirect from="/app" to="/app/home" />
                        <Route path="/app" component={AppShell} onEnter={requireAuth}>
                            <Route path="/app/home" component={Home}/>
                            <Route path="/app/chat" component={Chat}/>
                            <Route path="/app/perfil" component={Perfil}/>
                            <Route path="/app/curp" component={Curp}/>
                        </Route>
                        <Route path="*" component={Error}/>
                    </Route>
                </Router>
            </MuiThemeProvider>
        );
    }
}
