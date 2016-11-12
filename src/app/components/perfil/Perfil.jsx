// React
import React from 'react';
// Flux
import UserStore from 'app/stores/UserStore';
// Components
import CenteredContainer from 'app/components/misc/CenteredContainer';
import InnerContainer from 'app/components/misc/InnerContainer';
// Colors
import { primary, accent } from 'app/styles/colors';

// CSS-in-JS
const styles = {
    alignment: {
        textAlign: 'left'
    },
    title: {
        paddingTop: '5%',
        paddingBottom: '5%',
        fontSize: 30,
        fontWeight: 500,
        color: primary
    },
    legend: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%'
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
        paddingBottom: '5%',
        textDecoration: 'none',
        color: accent
    },
    signingUp: {
        color: primary
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

export default class Ayuda extends React.Component {
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
        this.USER_STORE_ID = UserStore.register(this._onChange);
    }

    componentWillUnmount() {
        UserStore.unregister(this.USER_STORE_ID);
    }

    _onChange = () => {
        this.setState({
            name: UserStore.state.get('name'),
            lastName1: UserStore.state.get('lastName1'),
            lastName2: UserStore.state.get('lastName2'),
            cellphone: UserStore.state.get('cellphone')
        });
    }

    render() {
        return (
            <CenteredContainer>
                <section style={styles.title}>
                    Mi Perfil
                    </section>
                <InnerContainer>
                    <div style={styles.alignment}>
                        <section style={styles.legend}>
                            Nombre: {this.state.name}
                        </section>
                        <section style={styles.legend}>
                            Apellido Paterno: {this.state.lastName1}
                        </section>
                        <section style={styles.legend}>
                            Apellido Materno: {this.state.lastName2}
                        </section>
                        <section style={styles.legend}>
                            Teléfono Celular: {this.state.cellphone}
                        </section>
                        <section style={styles.legend}>
                            Clave de Centro de Trabajo (CCT): {this.state.cct}
                        </section>
                    </div>
                </InnerContainer>
            </CenteredContainer>
        )
    }
}