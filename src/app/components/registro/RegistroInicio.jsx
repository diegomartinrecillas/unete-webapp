// React
import React from 'react';
// React-Router
import { Link } from 'react-router';
// Libraries and Helpers
import _ from 'lodash';
import linkState from 'app/utils/onChangeHandlerFactory';
// Flux
import signUpStore from 'app/stores/signUpStore';
import SignUpActions from 'app/actions/SignUpActions';
// Material UI Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import {red500, orange500, green500} from 'material-ui/styles/colors';
import { primary, accent } from 'app/components/commonStyles';

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
    button: {
        margin: 12
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
            confirmPasswordErrorText: ''
        };
    }
    componentDidMount() {
        this.SIGNUP_STORE_ID = signUpStore.register(this._onChange);
    }
    componentWillUnmount() {
        signUpStore.unregister(this.SIGNUP_STORE_ID);
    }
    _onChange = () => {}
    // Handlers
    handleFormSubmit = (e) => {
        // Prevent default form submit behaviour
        e.preventDefault();
        // Validate the email structure
        if (this.validateEmail(this.state.email)) {
            let email = this.state.email;
            let password = this.state.password;
            let router = this.context.router;

            SignUpActions.signUpWithEmail({
                email: email,
                password: password,
                router: router
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
                    <section>
                        <span>
                            <RaisedButton
                                type="submit"
                                label="Registrar"
                                secondary={true}
                                style={styles.button}/>
                            <Link to="/login" style={styles.link}>
                                <FlatButton label="Cancelar" primary={true} style={styles.button} />
                            </Link>
                        </span>
                    </section>
                    <section>
                        <Link to="/ayuda" style={styles.link} >
                            ¿Necesitas ayuda?
                        </Link>
                    </section>
                </form>
            </div>
        )
    }
}
