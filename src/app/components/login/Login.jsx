import React from 'react';

import appStore from 'app/stores/AppStore';
import LoginActions from 'app/actions/LoginActions';
import linkState from 'app/utils/onChangeHandlerFactory.js';

import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }
    // Store registration
    componentDidMount() {
        // Register
        this.id = appStore.register(() => {
            this.updateState();
        });
    }
    componentWillUnmount() {
        // Unregister
        appStore.unregister(this.id);
    }
    // Store callback
    updateState() {
        this.setState(appStore.loginState.get('state'));
    }
    // Handlers
    handleLogin = () => {
        LoginActions.saveLoginState(this.state);
    }
    // Render
    render() {
        return (
            <div>
                <AppBar
                    style={styles.title}
                    title='INICIO'
                    iconElementLeft={<div></div>}/>
                <div style={styles.container}>
                    <Paper zDepth={2} style={styles.paper}>
                        <img src={require('assets/images/unete.png')} style={styles.image}/>
                        <form>
                            <section>
                                <TextField
                                    hintText="Usuario"
                                    floatingLabelText="Usuario"
                                    value={this.state.user}
                                    onChange={linkState(this, 'user')}
                                    />
                            </section>
                            <section>
                                <TextField
                                    hintText="Contraseña"
                                    floatingLabelText="Contraseña"
                                    type="password"
                                    value={this.state.password}
                                    onChange={linkState(this, 'password')}
                                    />
                            </section>
                            <section>
                                <span>
                                    <RaisedButton
                                        label="Entrar"
                                        primary={true}
                                        style={styles.button}
                                        onClick={this.handleLogin}/>
                                    <Link to="/registro" style={styles.link}>
                                        <RaisedButton label="Regístrate" secondary={true} style={styles.button} />
                                    </Link>
                                </span>
                            </section>
                            <section>
                                <Link to="/ayuda" style={styles.link} >
                                    ¿Necesitas ayuda?
                                </Link>
                            </section>
                        </form>
                    </Paper>
                </div>
            </div>

        );
    }
}

const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        textAlign: 'center'
    },
    title: {
        textAlign: 'center'
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
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
