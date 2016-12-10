import React from 'react';
import { Link } from 'react-router';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';



const styles = {
    container: {
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        textAlign: 'center',
    },
    button: {
        margin: 12
    },
    textField: {},
    paper: {
        display: 'inline-block',
        width: '100%',
        maxWidth: 350
    },
    link: {
        textDecoration: 'none'
    },
    image: {
        paddingTop: '5%',
        maxWidth: '100%'
    },
    dateField:{
        fullWidth: 'false',
        width: '25%'
    }
}

export default class Curp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        };
    }

    handleChange = (event, index, value) => {
        this.setState({
            value
        });
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        const actions = [
            <FlatButton
                label="Guardar"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                label="Aceptar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
                />,
        ];
        return (
            <div style={styles.container}>
                <Paper zDepth={2} style={styles.paper}>
                    <img src={require('assets/images/curp.jpg')} style={styles.image}/>
                    <Subheader inset={false}>Ingresa los datos para generar tu CURP:</Subheader>
                    <TextField
                        hintText="Nombre"
                        floatingLabelText="Nombre"
                        style={styles.textField} />
                    <TextField
                        hintText="Apellido Paterno"
                        floatingLabelText="Apellido Paterno"
                        style={styles.textField} />
                    <TextField
                        hintText="Apellido Materno"
                        floatingLabelText="Apellido Materno"
                        style={styles.textField} />
                    <br/>
                    <Divider />
                    <Subheader inset={false}>Sexo:</Subheader>
                    <br/>
                    <RadioButtonGroup name="shipSpeed" defaultSelected="light">
                        <RadioButton
                            value="light"
                            label="Hombre"
                            style={styles.radioButton}
                            />
                        <RadioButton
                            value="not_light"
                            label="Mujer"
                            style={styles.radioButton}
                            />
                    </RadioButtonGroup>
                    <br/>
                    <Divider />
                    <Subheader inset={false}>Fecha de Nacimiento (DD/MM/AAAA):</Subheader>
                    <br/>
                    <TextField
                        hintText="Día"
                        style={styles.dateField} />
                    <TextField
                        hintText="Mes"
                        style={styles.dateField} />
                    <TextField
                        hintText="Año"
                        style={styles.dateField} />
                    <br/>
                    <Divider />
                    <Subheader inset={false}>Entidad Federativa de nacimiento:</Subheader>
                    <br/>
                    <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="México" />
                        <MenuItem value={2} primaryText="Distrito Federal" />
                        <MenuItem value={3} primaryText="Durango" />
                        <MenuItem value={4} primaryText="Guanajuato" />
                        <MenuItem value={5} primaryText="Nayarit" />
                    </DropDownMenu>
                    <br/>
                    <RaisedButton
                        label="Generar"
                        secondary={true}
                        style={styles.button}
                        onTouchTap={this.handleOpen} />
                    <Dialog
                        title="Su CURP:"
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        >
                        VEPA930803HDFLZN05
                    </Dialog>

                </Paper>
            </div>
        )
    }
}
