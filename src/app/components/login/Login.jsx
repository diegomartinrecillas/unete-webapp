import React from 'react';

import appStore from 'app/stores/AppStore';
import LoginActions from 'app/actions/LoginActions';
import linkState from 'app/utils/onChangeHandlerFactory.js';

import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 350
    },
    button: {
        margin: 12
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: '#00407A'
    },
    image: {
        paddingTop: '5%'
    }
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }
    // Store registration
    componentWillMount() {
        // Register
        this.storeID = appStore.register(() => {
            this.updateState();
        });
    }
    componentWillUnmount() {
        // Unregister
        appStore.unregister(this.storeID);
    }
    // Store callback
    updateState() {
        // setState() is async, execute a callback a second parameter to use the updated state
        this.setState(appStore.get('loginState'), () => {
            console.log(appStore.storeData);
        });
    }
    // Handlers
    handleLogin = () => {
        LoginActions.saveLoginState(
            this.state
        );

    }
    // Render
    render() {
        return (
            <div>
                <Paper zDepth={2} style={styles.paper}>
                    <img src={require('assets/images/unete.png')} style={styles.image}/>
                    <form>
                        <TextField
                            hintText="Usuario"
                            floatingLabelText="Usuario"
                            value={this.state.user}
                            onChange={linkState(this, 'user')}
                            />
                        <TextField
                            hintText="Contraseña"
                            floatingLabelText="Contraseña"
                            type="password"
                            value={this.state.password}
                            onChange={linkState(this, 'password')}
                            />
                        <RaisedButton
                            label="Entrar"
                            primary={true}
                            style={styles.button}
                            onClick={this.handleLogin}/>
                        <Link to="/registro" style={styles.link}>
                            <RaisedButton label="Regístrate" secondary={true} style={styles.button} />
                        </Link>
                        <Link to="/ayuda" style={styles.link} >
                            ¿Necesitas ayuda?
                        </Link>
                    </form>
                </Paper>
            </div>
        );
    }
}
