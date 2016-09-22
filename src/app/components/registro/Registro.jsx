import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import linkState from 'app/utils/onChangeHandlerFactory.js';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    button: {
        margin: 12
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 350
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

export default class Registro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName1: '',
            lastName2: '',
            email: '',
            emailErrorText: '',
            confirmEmail: '',
            confirmEmailErrorText: '',
            password: '',
            passwordErrorText: '',
            confirmPassword: '',
            confirmPasswordErrorText: ''
        };
    }
    handleFormSubmit = () => {
        return false;
    }
    handleConfirmEmail = (event) => {
        this.setState({
            confirmEmail: event.target.value
        });
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
    isEmpty = (value) => {
        return !_.isEmpty(value);
    }
    render() {
        return (
            <div>
                <Paper zDepth={2} style={styles.paper}>
                    <img src={require('assets/images/unete.png')} style={styles.image}/>
                    <form onClick={this.handleFormSubmit}>
                        <TextField
                            required={true}
                            hintText="Nombre"
                            floatingLabelText="Nombre"
                            value={this.state.name}
                            onChange={linkState(this, 'name')}
                            />
                        <TextField
                            required={true}
                            hintText="Apellido Paterno"
                            floatingLabelText="Apellido Paterno"
                            value={this.state.lastName1}
                            onChange={linkState(this, 'lastName1')}
                            />
                        <TextField
                            required={true}
                            hintText="Apellido Materno"
                            floatingLabelText="Apellido Materno"
                            value={this.state.lastName2}
                            onChange={linkState(this, 'lastName2')}
                            />
                        <TextField
                            required={true}
                            hintText="Correo Electrónico"
                            floatingLabelText="Correo Electrónico"
                            value={this.state.email}
                            errorText={this.state.emailErrorText}
                            onChange={linkState(this, 'email')}
                            />
                        <TextField
                            required={true}
                            hintText="Confirmar Correo Electrónico"
                            floatingLabelText="Confirmar Correo Electrónico"
                            value={this.state.confirmEmail}
                            errorText={this.state.confirmEmailErrorText}
                            onChange={this.handleConfirmEmail}
                            />
                        <TextField
                            required={true}
                            hintText="Contraseña"
                            floatingLabelText="Contraseña"
                            value={this.state.password}
                            errorText={this.state.passwordErrorText}
                            onChange={linkState(this, 'handleConfirmEmail')}
                            />
                        <TextField
                            required={true}
                            hintText="Confirmar Contraseña"
                            floatingLabelText="Confirmar Contraseña"
                            value={this.state.confrimPassword}
                            errorText={this.state.passwordErrorText}
                            onChange={this.handleConfirmPassword}
                            />
                        <RaisedButton
                            type="submit"
                            label="Registrar"
                            secondary={true}
                            style={styles.button}/>
                        <Link to="/login" style={styles.link}>
                            <FlatButton label="Cancelar" primary={true} style={styles.button} />
                        </Link>
                    </form>
                    <Link to="/ayuda" style={styles.link} >
                        ¿Necesitas ayuda?
                    </Link>
                </Paper>
            </div>
        )
    }
}
