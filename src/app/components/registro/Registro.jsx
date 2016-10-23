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
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

import {red500, orange500, green500} from 'material-ui/styles/colors';
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '0%',
        textAlign: 'center',
    },
    innerContainer: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    title: {
        paddingTop: '12%',
        paddingBottom: '5%',
        fontSize: 30,
        fontWeight: 500,
        color: primary
    },
    legend: {
        paddingTop: '5%',
        paddingBottom: '5%',
        fontSize: 20,
        fontWeight: 500,
        color: accent
    },

    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    flatButton: {

    },
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    image: {
        paddingTop: '5%',
        width: '80%'
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
    },
    signingUp: {
        color: primary
    },
    divider: {

        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    },
    spacer: {
        height: '5vh'
    },
    icon: {
        width: 40,
        height: 40,
        color: primary
    },
    iconButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        padding: 10,
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
    goBack = () => {
        window.history.back();
    }
    render() {
        return (
            <div style={styles.container}>
                <IconButton
                    onClick={this.goBack}
                    iconStyle={styles.icon}
                    style={styles.iconButton}
                    >
                    <ArrowBackIcon />
                </IconButton>
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        Regístrate
                    </section>
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
                        <section hidden={!this.state.isSigningUp}>
                            <p style={styles.signingUp}>Espere un momento...</p>
                        </section>
                        <div style={styles.spacer}/>
                        <hr style={styles.divider}/>
                        <section>
                            <RaisedButton
                                type="submit"
                                label="Registrar"
                                primary={true}
                                style={styles.button}/>
                        </section>
                        <section>
                            <Link to="/ayuda" style={styles.link}>
                                <FlatButton label="No me puedo registar" secondary={true} style={styles.flatButton} />
                            </Link>
                        </section>
                    </form>
                </div>

            </div>
        )
    }
}
