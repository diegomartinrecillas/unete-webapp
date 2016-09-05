import React from 'react';
import { Link } from 'react-router';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    container: {
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        textAlign: 'center',
    },
    button: {
        margin: 12
    },
    textField: {},
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 350
    },
    link: {
        textDecoration: 'none'
    },
    image: {
        paddingTop: '5%'
    }
}

export default class Registro extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <Paper zDepth={2} style={styles.paper}>
                    <img src={require('../assets/images/unete.png')} style={styles.image}/>
                    <TextField
                        hintText="Nombre"
                        floatingLabelText="Nombre"
                        style={styles.textField} />
                    <TextField
                        hintText="Apellido Paterno"
                        floatingLabelText="Apellido Paterno"
                        style={styles.textField} />
                    <TextField
                        hintText="Apellido Materno"
                        floatingLabelText="Apellido Materno"
                        style={styles.textField} />
                    <TextField
                        hintText="Correo Electrónico"
                        floatingLabelText="Correo Electrónico"
                        style={styles.textField} />
                    <TextField
                        hintText="Confirmar Correo Electrónico"
                        floatingLabelText="Confirmar Correo Electrónico"
                        style={styles.textField} />
                    <RaisedButton
                        label="Registrar"
                        secondary={true}
                        style={styles.button} />
                    <Link to="/login" style={styles.link}>
                        <FlatButton label="Cancelar" primary={true} style={styles.button} />
                    </Link>
                </Paper>
            </div>
        )
    }
}
