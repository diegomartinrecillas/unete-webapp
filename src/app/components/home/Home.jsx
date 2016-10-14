import React from 'react';

import LoginActions from 'app/actions/LoginActions';
import LoginStore from 'app/stores/LoginStore';

import RaisedButton from 'material-ui/RaisedButton';


const styles= {
    button: {
        margin: 12
    }
}
export default class Home extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }
    // Store registration
    componentDidMount() {
        // Register component callback and execute it instantly
        this.LOGIN_STORE_ID = LoginStore.register(this._onChange);
    }
    componentWillUnmount() {
        // Unregister
        LoginStore.unregister(this.LOGIN_STORE_ID);
    }
    componentDidUpdate() {
        if (this.state.isLoggedIn !== null) {
            if (!this.state.isLoggedIn) {
                let router = this.context.router;
                console.log(this.state.isLoggedIn);
                router.push('/login');
            }
        }
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isLoggedIn: LoginStore.state.get('isLoggedIn')
        });
    }
    handleLogout = () => {
        console.log('logout');
        LoginActions.logout();
    }
    render() {
        return (
            <div>
                <RaisedButton label="Salir" primary={true} style={styles.button} onClick={this.handleLogout}/>
            </div>
        )
    }
}
