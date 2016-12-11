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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
// Phone
import ReactPhoneInput from 'react-phone-input';
// Colots
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
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
    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    title: {
        paddingTop: '12%',
        paddingBottom: '5%',
        fontSize: 30,
        fontWeight: 500,
        color: primary
    },
    image: {
        paddingTop: '5%',
        width: '80%'
    },
    link: {
        display: 'inline-block',
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
    },
    legend: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
        textAlign: 'center'
    },
    divider: {
        maxWidth: '80%',
        height: 1,
        border: 'none',
        backgroundColor: 'rgb(224, 224, 224)'
    },
    spacer: {
        height: '5vh'
    },
    radioGroup: {
        maxWidth: 250,
        textAlign: 'center'
    },
    radioButton: {
        marginBottom: 16,
    },
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
            cellphoneError: '',
            cct: '',
            cctError: '',
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

        if (this.allOk()) {
            let data = {};
            data.name = this.state.name;
            data.lastName1 = this.state.lastName1;
            data.lastName2 = this.state.lastName2;
            data.cellphone = this.state.cellphone;
            data.cct = this.state.cct;

            SignUpActions.setSignUpData(data);
        }

        return false;
    }

    handleCellphone = (event) => {
        let value = event.target.value;
        if (value.length <= 10 && this.state.cellphone !== null) {
            this.setState({
                'cellphone': value,
                'cellphoneError': ''
            });
        }
    }

    handleCCT = (event) => {
        let value = event.target.value;
        if (value.length <= 10 && this.state.cct !== null) {
            this.setState({
                'cct': value,
                'cctError': ''
            });
        }
    }

    allOk = () => {
        let cellphone = false;
        let cct = false;

        if (this.state.cellphone.length === 10) {
            cellphone = true;
        } else {
            this.setState({
                'cellphoneError': 'Número celular inválido'
            })
        }

        let reg = new RegExp('^([0-2][1-9]|[3][0-2]|[1-2][0])[A-Z]{3}\\d{4}[A-Z]{1}$');

        if (this.state.cct.length === 10) {
            if (reg.test(this.state.cct)) {
                cct = true;
            } else {
                this.setState({
                    'cctError': 'Formato de CCT inválido'
                })
            }
        } else {
            this.setState({
                'cctError': 'Formato de CCT inválido'
            })
        }

        return cellphone && cct;

    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        Ingresa tus datos
                    </section>
                    <section style={styles.legend}>
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
                                type='number'
                                required={true}
                                hintText="Número Celular"
                                floatingLabelText="Número Celular (10 dígitos)"
                                errorText={this.state.cellphoneError}
                                value={this.state.cellphone}
                                onChange={this.handleCellphone}
                                />
                        </section>
                        <section>
                            <TextField
                                required={true}
                                hintText="Clave de Centro de Trabajo"
                                floatingLabelText="CCT (10 caracteres)"
                                errorText={this.state.cctError}
                                value={this.state.cct}
                                onChange={this.handleCCT}
                                />
                        </section>
                        <section>
                            <span >
                                <RaisedButton
                                    type="submit"
                                    label="Terminar Registro"
                                    secondary={true}
                                    style={styles.button} />
                            </span>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}
