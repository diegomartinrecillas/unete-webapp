import React from 'react';

import AppStore from 'app/stores/AppStore';
import LoginActions from 'app/actions/LoginActions';

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
    componentWillMount() {
        this.storeID = AppStore.registerView(() => {
            this.updateState();
        });
    }
    componentWillUnmount() {
        AppStore.deregisterStore(this.storeID);
    }
    updateState() {
        console.log(AppStore.get('hello'));
        console.log(AppStore.get('world'));
    }
    handleLogin = () => {
        const data = {
            hello: 'hello',
            world: 'world'
        }
        LoginActions.login(data);
    }
    render() {
        return (
            <div>
                <Paper zDepth={2} style={styles.paper}>
                    <img src={require('assets/images/unete.png')} style={styles.image}/>
                    <form>
                        <TextField
                            hintText="Usuario"
                            floatingLabelText="Usuario"
                            />
                        <TextField
                            hintText="Contraseña"
                            floatingLabelText="Contraseña"
                            type="password"
                            />
                        <RaisedButton
                            label="Entrar"
                            primary={true}
                            style={styles.button}
                            onClick={this.handleLogin}/>
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
