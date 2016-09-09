import React from 'react';
import { Link } from 'react-router';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
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
    render() {
        return (
            <div>
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
                    <Link to="/ayuda" style={styles.link} >
                        ¿Necesitas ayuda?
                    </Link>
                </Paper>
            </div>
        )
    }
}
