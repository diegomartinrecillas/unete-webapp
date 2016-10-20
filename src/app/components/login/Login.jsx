// React
import React from 'react';
import { firebaseAuth } from 'app/firebase/firebase';
// Flux
import LoginStore from 'app/stores/LoginStore';
import LoginActions from 'app/actions/LoginActions';
// React Router
import { Link } from 'react-router';
// Libraries and Helpers
import linkState from 'app/utils/onChangeHandlerFactory';
// Material UI Components
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { red500, orange500 } from 'material-ui/styles/colors';
// Colors
import { primary, accent } from 'app/styles/colors';
// Spinner Loader
import Loader from 'react-loader'

// CSS-in-JS
const styles = {
    container: {
        paddingTop: 70,
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '15%',
        textAlign: 'center'
    },
    appbar: {
        position: 'fixed',
        textAlign: 'center'
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    inlineButton: {
        marginTop: 12,
        marginRight: 12,
        marginLeft: 12
    },
    button: {
        margin: 12
    },
    link: {
        display: 'inline-block',
        paddingBottom: '0%',
        textDecoration: 'none',
        color: accent
    },
    image: {
        paddingTop: '5%'
    },
    isLoginError: {
        color: red500
    },
    loggingIn: {
        color: primary
    },
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    }
}

export default class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailErrorText: '',
            password: '',
            passwordErrorText: '',
            loginErrorMessage: '',
            isLoginError: false,
            isLoggedIn: false,
            isLoggingIn: false,
            isCheckingLoggedIn: false
        }
    }
    // Store registration
    componentDidMount() {
        // Register component callback and execute it instantly
        this.LOGIN_STORE_ID = LoginStore.register(this._onChange, false);
        LoginActions.checkLoggedIn();
        LoginActions.resetError();
    }
    componentWillUnmount() {
        // Unregister
        LoginStore.unregister(this.LOGIN_STORE_ID);
    }
    componentDidUpdate() {
        if (this.state.isLoggedIn !== null) {
            if (this.state.isLoggedIn) {
                let router = this.context.router;
                router.push('/app/home');
            }
        }
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isLoginError: LoginStore.state.get('isLoginError'),
            isLoggedIn: LoginStore.state.get('isLoggedIn'),
            isLoggingIn: LoginStore.state.get('isLoggingIn'),
            loginErrorMessage: LoginStore.state.get('loginErrorMessage'),
            isCheckingLoggedIn: LoginStore.state.get('isCheckingLoggedIn')
        });
    }
    // Handlers

    handleFacebookLogin = () => {
        LoginActions.loginWithFacebook();
    }

    handleGoogleLogin = () => {
        LoginActions.loginWithGoogle();
    }
    // Handle <form> login event
    handleLogin = (event) => {
        // Disable <form> default actions
        event.preventDefault();
        // Validate email and password existance
        if (!this._emailOrPasswordEmpty()) {
            // Validate the email structure
            if (this._validateEmail(this.state.email)) {
                let email = this.state.email;
                let password = this.state.password;

                LoginActions.loginWithEmail({
                    email: email,
                    password: password,
                });
            } else {
                this.setState({
                    emailErrorText: 'Correo no valido'
                });
            }
        }
        // Disable <form> default actions a second time to be sure
        return false;
    }
    // Handle email change
    handleEmail = (event) => {
        let value = event.target.value;
        this.setState({
            email: value,
            isLoginError:  false,
            emailErrorText: ''
        });
    }
    // Handle password change
    handlePassword = (event) => {
        let value = event.target.value;
        this.setState({
            password: value,
            isLoginError:  false,
            passwordErrorText: ''
        });
    }
    // Helpers
    // Check if email OR password is empty
    _emailOrPasswordEmpty = () => {
        let emailEmpty = true;
        let passwordEmpty = true;
        if (this.state.password.length < 1) {
            this.setState({
                passwordErrorText: 'Introduce tu contraseña'
            });
        } else {
            this.setState({
                passwordErrorText: ''
            });
            passwordEmpty = false;
        }
        if (this.state.email.length < 1) {
            this.setState({
                emailErrorText: 'Introduce tu correo'
            });
        } else {
            this.setState({
                emailErrorText: ''
            });
            emailEmpty = false;
        }
        if (passwordEmpty || emailEmpty) {
            return true;
        } else {
            return false;
        }
    }
    // RegExp to check email structure
    _validateEmail = (event) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    }
    // Render
    render() {
        let loaderOptions = {
            lines: 9,
            length: 20,
            color: primary,
            radius: 30,
            width: 10
        }

        let loggingIn;
        if (this.state.isLoggingIn) {
            loggingIn =
            <section>
                <p style={styles.loggingIn}>Espere un momento...</p>
            </section>;
        }
        let isLoginError;
        if (this.state.isLoginError) {
            isLoginError =
            <section>
                <p style={styles.isLoginError}>{this.state.loginErrorMessage}</p>
            </section>;
        }
        return (
            <div hidden={this.state.isCheckingLoggedIn}>
                <AppBar
                    style={styles.appbar}
                    title='INICIA SESIÓN'
                    iconElementLeft={<div></div>}/>
                <div style={styles.container}>
                    <Paper zDepth={2} style={styles.paper}>
                        <img src={require('assets/images/unete.png')} style={styles.image}/>
                        <form>
                            <section>
                                <TextField
                                    hintText="Correo Electrónico"
                                    floatingLabelText="Correo Electrónico"
                                    value={this.state.email}
                                    onChange={this.handleEmail}
                                    errorText={this.state.emailErrorText}
                                    />
                            </section>
                            <section>
                                <TextField
                                    hintText="Contraseña"
                                    floatingLabelText="Contraseña"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    errorText={this.state.passwordErrorText}
                                    />
                            </section>
                            {isLoginError}
                            {loggingIn}
                            <section>
                                <span>
                                    <RaisedButton
                                        label="Entrar"
                                        primary={true}
                                        style={styles.inlineButton}
                                        onClick={this.handleLogin}/>
                                    <Link to="/registro" style={styles.link}>
                                        <RaisedButton label="Regístrate" secondary={true} style={styles.inlineButton} />
                                    </Link>
                                </span>
                            </section>
                            <section>
                                <Link to="/restore" >
                                    <FlatButton label={'¿Olvidaste tu contraseña?'} primary={true} style={styles.button}/>
                                </Link>
                            </section>
                            <hr style={styles.divider}/>
                            <section>
                                <RaisedButton
                                    label="Inicia sesión con Facebook"
                                    style={styles.button}
                                    onClick={this.handleFacebookLogin}
                                    backgroundColor={"#3B5998"}
                                    labelColor={"white"}/>
                            </section>
                            <section>
                                <RaisedButton
                                    label="Inicia sesión con Google"
                                    style={styles.button}
                                    onClick={this.handleGoogleLogin}
                                    backgroundColor={"#DD4B39"}
                                    labelColor={"white"}/>
                            </section>
                            <hr style={styles.divider}/>
                            <section>
                                <Link to="/about" style={styles.link} >
                                    <FlatButton label={'Acerca de UNETE'} secondary={true} style={styles.button}/>
                                </Link>
                            </section>
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}
