// React
import React from 'react';
// React Router
import { Link } from 'react-router';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import { primary, accent } from 'app/styles/colors';



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
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    },
    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    },
    spacer: {
        height: '5vh'
    }
}

export default class RestoreFinished extends React.Component {
    render() {
        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        <strong>Recuperación</strong>
                    </section>
                    <section style={styles.legend}>
                        Se ha enviado un correo a <strong>{this.props.params.email}</strong> con las instrucciones para restablecer tu cuenta.
                    </section>
                    <div style={styles.spacer}/>
                    <hr style={styles.divider}/>
                    <section>
                        <Link to="/login" style={styles.link}>
                            <RaisedButton label="Regresar" primary={true} style={styles.button} />
                        </Link>
                    </section>
                </div>
            </div>
        )
    }
}
