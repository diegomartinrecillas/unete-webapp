// React
import React from 'react';
// Flux
import UserStore from 'app/stores/UserStore';

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

    componentDidMount () {
        this.USER_STORE_ID = UserStore.register(this._onChange);
    }

    componentWillUnmount () {
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
            <div>
                <div>
                    MI PERFIL
                    <br/>
                    {this.state.name}
                    <br/>
                    {this.state.lastName1}
                    <br/>
                    {this.state.lastName2}
                    <br/>
                    {this.state.cellphone}
                </div>
            </div>
        )
    }
}