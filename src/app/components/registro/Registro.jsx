// React
import React from 'react';
// Libraries and Helpers
import _ from 'lodash';
import linkState from 'app/utils/onChangeHandlerFactory';
// Material UI Components
import Paper from 'material-ui/Paper';
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
    image: {
        paddingTop: '5%'
    }
}

export default class RegistroInicio extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <AppBar
                    style={styles.title}
                    title='REGISTRO'
                    iconElementLeft={<div></div>}/>
                <div style={styles.container}>
                    <Paper zDepth={2} style={styles.paper}>
                        <img src={require('assets/images/unete.png')} style={styles.image}/>
                        {this.props.children}
                    </Paper>
                </div>
            </div>
        )
    }
}
