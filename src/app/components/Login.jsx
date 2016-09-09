import React from 'react';
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
    render() {
        return (
            <div>
                <Paper zDepth={2} style={styles.paper}>
                    <img src={require('../assets/images/unete.png')} style={styles.image}/>
                    <form>
                        <TextField
                            hintText="Usuario"
                            floatingLabelText="Usuario"
                            />
                        <TextField
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            />
                        <RaisedButton label="Entrar" primary={true} style={styles.button} />
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
