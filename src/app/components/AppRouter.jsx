// React
import React from 'react';
// React Router
import { IndexRoute, Redirect, Router, Route, hashHistory } from 'react-router'
// Libraries and Helpers
import requireAuth from 'app/firebase/requireAuth';
// Material UI Components
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// App Components
import About from './about/About';
import AppShell from './app_shell/AppShell';
import Ayuda from './ayuda/Ayuda';
import Chat from './chat/Chat';
import Curp from './curp/Curp';
import Datos from './datos/Datos';
import Error from './error/Error';
import Eventos from './eventos/Eventos';
import Home from './home/Home';
import Login from './login/Login';
import Mensajes from './mensajes/Mensajes';
import Noticias from './noticias/Noticias';
import Perfil from './perfil/Perfil';
import Registro from './registro/Registro';
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

export default class AppRouter extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router history={hashHistory}>
                    <Route path="/" component={RootShell}>
                        <IndexRoute component={Login}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/restore" component={Restore}/>
                        <Route path="/restore-finished/:email" component={RestoreFinished}/>
                        <Route path="/registro" component={Registro}/>
                        <Route path="/ayuda" component={Ayuda}/>
                        <Route path="/about" component={About}/>
                        <Route path="/error" component={Error}/>
                        <Redirect from="/app" to="/app/home" />
                        <Route path="/app" component={AppShell} onEnter={requireAuth}>
                            <Route path="/app/home" component={Home}/>
                            <Route path="/app/chat" component={Chat}/>
                            <Route path="/app/perfil" component={Perfil}/>
                            <Route path="/app/curp" component={Curp}/>
                            <Route path="/app/noticias" component={Noticias}/>
                            <Route path="/app/mensajes" component={Mensajes}/>
                            <Route path="/app/eventos" component={Eventos}/>
                        </Route>
                        <Route path="/datos" component={Datos} onEnter={requireAuth}/>
                    </Route>
                    <Route path="*" component={Error}/>
                </Router>
            </MuiThemeProvider>
        );
    }
}
