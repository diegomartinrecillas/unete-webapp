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
        color: '#00407A'
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
            confirmPassword: '',
            confirmPasswordErrorText: ''
        };
    }
    componentDidMount() {
        this.id = signUpStore.register(() => {
            this.updateState();
        });
    }
    componentWillUnmount() {
        signUpStore.unregister(this.id);
    }
    updateState() {
        console.log('RegistroInicio State changes here');
    }
    handleFormSubmit = (e) => {
        // Prevent default form submit behaviour
        e.preventDefault();

        // if (this.validateEmail(this.state.email)) {
        //     let path = '/registro/datos';
        //     this.context.router.push(path);
        // } else {
        //     this.setState({
        //         emailErrorText: 'Correo no valido'
        //     });
        // }

        let path = '/registro/datos';
        this.context.router.push(path);

        return false;
    }
    handleConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        });
    }
    validateEmail = (event) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
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
                            hintText="Contraseña"
                            floatingLabelText="Contraseña"
                            value={this.state.password}
                            errorText={this.state.passwordErrorText}
                            onChange={linkState(this, 'password')}
                            />
                    </section>
                    <section>
                        <TextField
                            required={true}
                            hintText="Confirmar Contraseña"
                            floatingLabelText="Confirmar Contraseña"
                            value={this.state.confirmPassword}
                            errorText={this.state.passwordErrorText}
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
