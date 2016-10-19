// React
import React from 'react';
// React Router
import { Link } from 'react-router';
// Libraries and Helpers
import _ from 'lodash';
import linkState from 'app/utils/onChangeHandlerFactory';
// Flux
import SignUpStore from 'app/stores/SignUpStore';
import SignUpActions from 'app/actions/SignUpActions';
// Material UI Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '7%',
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
    },
    button: {
        margin: 30
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
    },
    text: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    }
}

export default class Datos extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName1: '',
            lastName2: '',
            cellphone: '',
            genero: '',
            cct: '',
            nombreEscuela: '',
            doneSignUp: false

        };
    }
    componentDidMount() {
        this.SIGNUP_STORE_ID = SignUpStore.register(this._onChange);
    }

    componentWillUnmount() {
        SignUpStore.unregister(this.SIGNUP_STORE_ID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.doneSignUp !== null) {
            if (this.state.doneSignUp) {
                let router = this.context.router;
                router.push('/app/home');
            }
        }
    }

    _onChange = () => {
        this.setState({
            doneSignUp: SignUpStore.state.get('doneSignUp')
        })
    }
    handleFormSubmit = (e) => {
        // Prevent default form submit behaviour
        e.preventDefault();

        let data = {};
        data.name = this.state.name;
        data.lastName1 = this.state.lastName1;
        data.lastName2 = this.state.lastName2;
        data.cellphone = this.state.cellphone

        SignUpActions.setSignUpData(data);

        return false;
    }
    render() {
        return (
            <div>
                <AppBar
                    style={styles.title}
                    title='REGÍSTRATE'
                    iconElementLeft={<div></div>}/>
                <div style={styles.container}>
                    <Paper zDepth={2} style={styles.paper}>
                        <img src={require('assets/images/unete.png')} style={styles.image}/>
                            <section style={styles.text}>
                                <strong>Ya casi!</strong>
                                <br/>
                                <br/>
                                Termina tu registro llenando los siguientes datos para empezar a utilizar la aplicación.
                            </section>
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
                                        hintText="Género"
                                        floatingLabelText="NGénero"
                                        value={this.state.genero}
                                        onChange={linkState(this, 'genero')}
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
                                    <TextField
                                        required={true}
                                        hintText="Clave de Centro de Trabajo (CCT)"
                                        floatingLabelText="Clave de Centro de Trabajo (CCT)"
                                        value={this.state.cct}
                                        onChange={linkState(this, 'cct')}
                                        />
                                </section>
                                <section>
                                    <TextField
                                        required={true}
                                        hintText="Nombre de Escuela"
                                        floatingLabelText="Nombre de Escuela"
                                        value={this.state.nombreEscuela}
                                        onChange={linkState(this, 'nombreEscuela')}
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
                    </Paper>
                </div>

            </div>
        )
    }
}
