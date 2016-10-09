// React
import React from 'react';
// React Router
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
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

// CSS-in-JS
const styles = {
    button: {
        margin: 20
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: '#00407A'
    }
}

export default class RegistroDatos extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName1: '',
            lastName2: '',
            cellphone: ''
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
        console.log('RegistroDatos State changes go here');
    }
    handleFormSubmit = (e) => {
        // Prevent default form submit behaviour
        e.preventDefault();
        let path = '/';
        this.context.router.push(path);
        return false;
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <section>
                        <TextField
                            required={true}
                            hintText="Nombre(s)"
                            floatingLabelText="Nombre(s)"
                            value={this.state.name}
                            onChange={linkState(this, 'name')}
                            />
                    </section>
                    <section>
                        <TextField
                            required={true}
                            hintText="Apellido Paterno"
                            floatingLabelText="Apellido Paterno"
                            value={this.state.lastName1}
                            onChange={linkState(this, 'lastName1')}
                            />
                    </section>
                    <section>
                        <TextField
                            required={true}
                            hintText="Apellido Materno"
                            floatingLabelText="Apellido Materno"
                            value={this.state.lastName2}
                            onChange={linkState(this, 'lastName2')}
                            />
                    </section>
                    <section>
                        <TextField
                            required={true}
                            hintText="Número Celular"
                            floatingLabelText="Número Celular"
                            value={this.state.cellphone}
                            onChange={linkState(this, 'cellphone')}
                            />
                    </section>
                    <section>
                        <span >
                            <RaisedButton
                                type="submit"
                                label="Terminar Registro"
                                secondary={true}
                                style={styles.button}/>
                        </span>
                    </section>
                </form>
            </div>
        )
    }
}
