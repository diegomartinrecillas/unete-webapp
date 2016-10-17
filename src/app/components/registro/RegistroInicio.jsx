// React
import React from 'react';
// React-Router
import { Link } from 'react-router';
// Libraries and Helpers
import _ from 'lodash';
import linkState from 'app/utils/onChangeHandlerFactory';
// Flux
import SignUpStore from 'app/stores/SignUpStore';
import SignUpActions from 'app/actions/SignUpActions';
import LoginStore from 'app/stores/LoginStore';
// Material UI Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {red500, orange500, green500} from 'material-ui/styles/colors';
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        textAlign: 'center',
    },
    title: {
        textAlign: 'center'
    },
    inlineButton: {
        margin: 12
    },
    button: {
        marginTop: 12
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
    },
    image: {
        paddingTop: '5%'
    },
    signingUp: {
        color: primary
    }
}

export default class RegistroInicio extends React.Component {
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
            passwordErrorStyle: {},
            confirmPassword: '',
            confirmPasswordDisabled: true,
            confirmPasswordErrorText: '',
            isLoggedIn: false,
            isSigningUp: false
        };
    }
    componentDidMount() {
        this.SIGNUP_STORE_ID = SignUpStore.register(this._onChange);
        this.LOGIN_STORE_ID = LoginStore.register(this._onChange);
    }
    componentWillUnmount() {
        SignUpActions.resetError();
        SignUpStore.unregister(this.SIGNUP_STORE_ID);
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
    _onChange = () => {
        this.setState({
            isLoggedIn: LoginStore.state.get('isLoggedIn'),
            isSigningUp: SignUpStore.state.get('isSigningUp'),
            emailErrorText: SignUpStore.state.get('signUpError')
        });
    }
    // Handlers
    handleFormSubmit = (e) => {
        // Prevent default form submit behaviour
        e.preventDefault();
        // Validate the email structure
        if (this.validateEmail(this.state.email)) {
            let email = this.state.email;
            let password = this.state.password;

            SignUpActions.signUpWithEmail({
                email: email,
                password: password
            });
        } else {
            this.setState({
                emailErrorText: 'Correo no valido'
            });
        }
        return false;
    }
    handlePassword = (event) => {
        let value = event.target.value;
        let disabled = (value.length > 0) ? false : true;
        this.setState({
            password: value,
            confirmPasswordDisabled: disabled
        }, () => {
            if (this.state.confirmPassword !== this.state.password && this.state.confirmPassword !== '') {
                this.setState({
                    confirmPasswordErrorText: 'Las contraseñas no coinciden'
                });
            } else {
                this.setState({
                    confirmPasswordErrorText: ''
                });
            }
            this.validatePassword(this.state.password);
        });
    }
    handleConfirmPassword = (event) => {
        let value = event.target.value;
        this.setState({
            confirmPassword: value
        }, () => {
            if (this.state.confirmPassword !== this.state.password) {
                this.setState({
                    confirmPasswordErrorText: 'Las contraseñas no coinciden'
                });
            } else {
                this.setState({
                    confirmPasswordErrorText: ''
                });
            }
        });
    }
    validateEmail = (event) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    }
    validatePassword = (password) => {
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (password.length < 1) {
            this.setState({
                passwordErrorText: ''
            })
        } else if (strongRegex.test(password)) {
            let errorStyle = {
                color: green500
            }
            this.setState({
                passwordErrorText: 'La contraseña es buena',
                passwordErrorStyle: errorStyle
            })
        } else if (mediumRegex.test(password)) {
            let errorStyle = {
                color: orange500
            }
            this.setState({
                passwordErrorText: 'La contraseña es regular',
                passwordErrorStyle: errorStyle
            })
        } else {
            let errorStyle = {
                color: red500
            }
            this.setState({
                passwordErrorText: 'La contraseña es demasiado débil',
                passwordErrorStyle: errorStyle
            })
        }
    }
    render() {
        let signingUp;
        if (this.state.isSigningUp) {
            signingUp =
            <section>
                <p style={styles.signingUp}>Espere un momento...</p>
            </section>;
        }
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <section>
                        <TextField
                            required={true}
                            hintText="Correo Electrónico"
                            floatingLabelText="Correo Electrónico"
                            value={this.state.email}
                            errorText={this.state.emailErrorText}
                            onChange={linkState(this, 'email')}
                            />
                    </section>
                    <section>
                        <TextField
                            required={true}
                            hintText="Crear Contraseña"
                            floatingLabelText="Crear Contraseña"
                            type="password"
                            value={this.state.password}
                            errorText={this.state.passwordErrorText}
                            errorStyle={this.state.passwordErrorStyle}
                            onChange={this.handlePassword}
                            />
                    </section>
                    <section>
                        <TextField
                            required={true}
                            hintText="Confirmar Contraseña"
                            floatingLabelText="Confirmar Contraseña"
                            type="password"
                            disabled={this.state.confirmPasswordDisabled}
                            value={this.state.confirmPassword}
                            errorText={this.state.confirmPasswordErrorText}
                            onChange={this.handleConfirmPassword}
                            />
                    </section>
                    {signingUp}
                    <section>
                        <span>
                            <RaisedButton
                                type="submit"
                                label="Registrar"
                                secondary={true}
                                style={styles.inlineButton}/>
                            <Link to="/login">
                                <FlatButton label="Cancelar" primary={true} style={styles.inlineButton} />
                            </Link>
                        </span>
                    </section>
                    <section>
                        <Link to="/ayuda" style={styles.link}>
                            <FlatButton label="No me puedo registar" secondary={true} style={styles.button} />
                        </Link>
                    </section>
                </form>
            </div>
        )
    }
}
