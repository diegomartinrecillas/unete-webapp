// React
import React from 'react';
//Flux
import SignUpActions from 'app/actions/SignUpActions';
import SignUpStore from 'app/stores/SignUpStore';
// React Router
import { Link, hashHistory } from 'react-router';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
// Misc Components
import ArrowBack from 'app/components/misc/ArrowBack';

import { red500 } from 'material-ui/styles/colors';
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
    appbar: {
        position: 'fixed',
        textAlign: 'center'
    },
    button: {
        margin: 12,
        width: '70%',
        height: 50
    },
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 400
    },
    image: {
        paddingTop: '5%',
        width: '80%'
    },
    link: {
        display: 'inline-block',
        textDecoration: 'none',
        paddingBottom: '5%',
        color: accent
    },
    restoreText: {
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
    }
}

export default class Restore extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            isPasswordReset: false,
            restoreDisabled: true,
            isDialogOpen: false,
            email: '',
            emailErrorText: '',
            confirmEmail: '',
            confirmEmailErrorText: ''
        };
    }

    componentDidMount() {
        this.SIGNUP_STORE_ID = SignUpStore.register(this._onChange);
    }

    componentWillUnmount() {
        SignUpStore.unregister(this.SIGNUP_STORE_ID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isPasswordReset !== null) {
            if (this.state.isPasswordReset) {
                let router = this.context.router;
                router.push(`/restore-finished/${this.state.email}`);
            }
        }
    }

    _onChange = () => {
        this.setState({
            isPasswordReset: SignUpStore.state.get('isPasswordReset')
        });
    }

    goBack = () => {
        window.history.back();
    }

    handleCloseDialog = () => {
        this.setState({
            isDialogOpen: false
        });
    }

    // Handle email change
    handleEmail = (event) => {
        let email = event.target.value;

        this.setState({
            email: email,
            emailErrorText: ''
        });

        if (email === '') {
            this.setState({
                emailErrorText: ''
            });
        } else if (email !== this.state.confirmEmail) {
            this.setState({
                restoreDisabled: true,
                confirmEmailErrorText: 'Los correos no coninciden'
            });
        } else {
            this.setState({
                restoreDisabled: false,
                confirmEmailErrorText: ''
            });
        }
    }

    handleConfirmEmail = (event) => {
        let confirmEmail = event.target.value;
        this.setState({
            confirmEmail: confirmEmail,
            confirmEmailErrorText: ''
        });
        if (confirmEmail === '') {
            this.setState({
                confirmEmailErrorText: ''
            });
        } else if (this.state.email !== confirmEmail) {
            this.setState({
                restoreDisabled: true,
                confirmEmailErrorText: 'Los correos no coninciden'
            });
        } else {
            this.setState({
                restoreDisabled: false,
                confirmEmailErrorText: ''
            });
        }
    }

    handleRestore = () => {
        if (this._validateEmail(this.state.email)) {
            this.setState({
                isDialogOpen: true
            })
        } else {
            this.setState({
                emailErrorText: 'Correo no valido'
            })
        }

    }

    handleConfirmRestore = () => {
        SignUpActions.resetPasswordWithEmail({
            email: this.state.email
        });
    }

    // RegExp to check email structure
    _validateEmail = (event) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    }
    
    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleCloseDialog}
                />,
            <RaisedButton
                label="Restablecer Contraseña"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleConfirmRestore}
                />,
        ];
        return (
            <div style={styles.container}>
                <Dialog
                    title="Restablecer Contraseña"
                    actions={actions}
                    modal={false}
                    open={this.state.isDialogOpen}
                    onRequestClose={this.handleCloseDialog}
                    >
                    La cuenta asociada al correo <strong>{this.state.email}</strong> está por ser restablecida.
                    <br/>
                    <br/>
                    <strong>
                        ¿Seguro que deseas continuar?
                    </strong>
                </Dialog>
                <ArrowBack/>
                <div style={styles.innerContainer}>
                    <section style={styles.title}>
                        Recuperación
                    </section>
                    <section style={styles.restoreText}>
                        Si <strong>NO</strong> recuerdas tu contraseña puedes restablecer tu cuenta utilizando el <strong>Correo Electrónico</strong> con el que inicias sesión, un correo será enviado a dicha dirección con mas instrucciones.
                    </section>
                    <section>
                        <TextField
                            hintText="Correo Electrónico"
                            floatingLabelText="Correo Electrónico"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            errorText={this.state.emailErrorText}
                            />
                    </section>
                    <section>
                        <TextField
                            hintText="Confirmar Correo Electrónico"
                            floatingLabelText="Confirmar Correo Electrónico"
                            value={this.state.confirmEmail}
                            onChange={this.handleConfirmEmail}
                            errorText={this.state.confirmEmailErrorText}
                            />
                    </section>
                    <section>
                        <RaisedButton
                            label="Restablecer"
                            disabled={this.state.restoreDisabled}
                            secondary={true}
                            style={styles.button}
                            onClick={this.handleRestore}/>
                    </section>
                    <section>
                        <Link to="/ayuda" style={styles.link}>
                            <FlatButton label="No puedo solucionar mi problema" secondary={true} style={styles.flatButton} />
                        </Link>
                    </section>
                </div>
            </div>
        )
    }
}
