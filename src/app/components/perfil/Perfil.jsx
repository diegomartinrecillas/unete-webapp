// React
import React from 'react';
// Flux
import UserStore from 'app/stores/UserStore';
// Material UI Components
import Card from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
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
        fontSize: 12,
        fontWeight: 400,
        color: primary
    },
    legend: {
        color: 'grey',
        paddingTop: '5%',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    entry: {
        color: 'black',
        paddingRight: '0.3em',
        overflowWrap: 'normal'
    },
    avatar: {

    },
    image: {
        top: 0,
        left: 0,
        height: '50%',
        width: '100%'
    },
    container: {

    },
    main: {
        paddingTop: -20
    }

}

export default class Ayuda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
            email: UserStore.state.get('email'),
            name: UserStore.state.get('name'),
            lastName1: UserStore.state.get('lastName1'),
            lastName2: UserStore.state.get('lastName2'),
            cellphone: UserStore.state.get('cellphone'),
            cct: UserStore.state.get('cct')
        });
    }

    render() {
        return (
            <div style={styles.main}>
                <img src={require('assets/images/drawer_background.png')}
                    style={styles.image}/>
                <div  style={styles.container}>
                    <CenteredContainer>
                        <InnerContainer>
                            <div style={styles.alignment}>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Nombre
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.name}
                                    </span>
                                    <span style={styles.entry}>
                                        {this.state.lastName1}
                                    </span>
                                    <span style={styles.entry}>
                                        {this.state.lastName2}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Correo Electrónico
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.email}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Teléfono Celular
                                    </span>
                                    <br/>

                                    <span style={styles.entry}>
                                        (+52) {this.state.cellphone}
                                    </span>
                                </section>
                                <Divider/>
                                <section style={styles.legend}>
                                    <span style={styles.title}>
                                        Clave de Centro de Trabajo
                                    </span>
                                    <br/>
                                    <span style={styles.entry}>
                                        {this.state.cct}
                                    </span>
                                </section>
                                <Divider/>
                            </div>
                        </InnerContainer>
                    </CenteredContainer>
                </div>
            </div>
        )
    }
}
