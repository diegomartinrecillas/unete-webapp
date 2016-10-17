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
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        textAlign: 'center'
    },
    errorContainer: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    title: {
        textAlign: 'center'
    },
    button: {
        margin: 20
    },
    restoreText: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    },
    image: {
        paddingTop: '5%'
    },
}

export default class Error extends React.Component {
    goBack = () => {
        window.history.back();
    }
    render() {
        return (
            <div >
                <AppBar
                    style={styles.title}
                    title='ERROR'
                    iconElementLeft={<div></div>}
                    />
                <div style={styles.container}>
                    <Paper zDepth={2} style={styles.errorContainer}>
                        <img src={require('assets/images/unete.png')} style={styles.image}/>
                        <section style={styles.restoreText}>
                            <strong>404</strong>
                            <br/>
                            <br/>
                            Oops, esta sección no existe.
                        </section>
                        <section>
                            <FlatButton
                                label="Regresar"
                                primary={true}
                                style={styles.button}
                                onClick={this.goBack}/>
                        </section>
                    </Paper>
                </div>
            </div>
        )
    }
}
