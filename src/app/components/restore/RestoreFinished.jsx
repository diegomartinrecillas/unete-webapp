// React
import React from 'react';
// React Router
import { Link } from 'react-router';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import { primary, accent } from 'app/styles/colors';



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
    image: {
        paddingTop: '5%',
        width: '80%'
    },
    button: {
        marginTop: 12
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
    },
    restoreText: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    }
}

export default class RestoreFinished extends React.Component {
    render() {
        return (
            <div>
                <AppBar
                    style={styles.appbar}
                    title='RECUPERACIÓN'
                    iconElementLeft={<div></div>}
                    />
                <div style={styles.container}>
                    <Paper zDepth={2} style={styles.paper}>
                        <img src={require('assets/images/unete.png')} style={styles.image}/>
                        <section style={styles.restoreText}>
                            Se ha enviado un correo a <strong>{this.props.params.email}</strong> con las instrucciones para restablecer tu cuenta.
                        </section>
                        <section>
                            <Link to="/login" style={styles.link}>
                                <FlatButton label="Regresar" primary={true} style={styles.button} />
                            </Link>
                        </section>
                    </Paper>
                </div>
            </div>
        )
    }
}
