// React
import React from 'react';
// Flux
import UserStore from 'app/stores/UserStore';
// Components
import CenteredContainer from 'app/components/misc/CenteredContainer';
import InnerContainer from 'app/components/misc/InnerContainer';
import Divider from 'app/components/misc/Divider';
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
    entry: {
        color: accent
    }

}

export default class Ayuda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName1: '',
            lastName2: '',
            cellphone: '',
            cct: ''
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
            cellphone: UserStore.state.get('cellphone'),
            cct: UserStore.state.get('cct')
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
                            NOMBRE: <span style={styles.entry}>{this.state.name}</span>
                        </section>
                        <Divider/>
                        <section style={styles.legend}>
                            APELLIDO PATERNO: <span style={styles.entry}>{this.state.lastName1}</span>
                        </section>
                        <Divider/>
                        <section style={styles.legend}>
                            APELLIDO MATERNO: <span style={styles.entry}>{this.state.lastName2}</span>
                        </section>
                        <Divider/>
                        <section style={styles.legend}>
                            TELÉFONO CELULAR: <span style={styles.entry}>{this.state.cellphone}</span>
                        </section>
                        <Divider/>
                        <section style={styles.legend}>
                            CLAVE DE DENTRO DE TRABAJO (CCT): <span style={styles.entry}>{this.state.cct}</span>
                        </section>
                        <Divider/>
                    </div>
                </InnerContainer>
            </CenteredContainer>
        )
    }
}
