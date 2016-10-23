// React
import React from 'react';
// Flux
import LoginActions from 'app/actions/LoginActions';
import LoginStore from 'app/stores/LoginStore';
import SignUpStore from 'app/stores/SignUpStore';
import SignUpActions from 'app/actions/SignUpActions';
// React router
import { Link } from 'react-router';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Divider from 'material-ui/Divider';
// Material Icons
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import HelpIcon from 'material-ui/svg-icons/action/help';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import ChatIcon from 'material-ui/svg-icons/communication/chat';
import HomeIcon from 'material-ui/svg-icons/action/home';
import NoteIcon from 'material-ui/svg-icons/AV/note';
// Colors
import { primary, accent } from 'app/styles/colors';

const styles = {
    container: {
        paddingTop: 70,
        paddingBottom: '2%'
    },
    logoContainer: {
        backgroundColor: 'rgb(20,20,20)',
        position: 'relative',
        height: 200
    },
    appbar: {
        position: 'fixed'
    },
    logo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        cursor: 'pointer',
        fontSize: '20px',
        color: 'white',
        lineHeight: '0',
        fontWeight: 400,
        marginBottom: '20px',
        marginLeft: '15px'
    },
    link: {
        textDecoration: 'none',
        boxSizing: 'border-box',
        display: 'block'
    },
    activeLink: {
        backgroundColor: 'rgba(0,0,0,0.05)'
    },
    menuItem: {
        fontSize: 16,
        fontWeight: 500,
        color: 'rgb(30,30,30)',
    },
    drawer: {
        backgroundColor: '#fafafa'
    },
    image: {
        maxHeight: '100%',
        opacity: 0.5
    }
}

export default class AppShell extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            doneSignUp: false,
            drawerIsOpen: false,
            popoverIsOpen: false
        }
    }
    // Store registration
    componentDidMount() {
        // Register component callback and execute it instantly
        this.LOGIN_STORE_ID = LoginStore.register(this._onChange, false);
        this.SIGNUP_STORE_ID = SignUpStore.register(this._onChange, false);
        SignUpActions.checkSignUpDone();
    }
    componentWillUnmount() {
        // Unregister
        LoginStore.unregister(this.LOGIN_STORE_ID);
        SignUpStore.unregister(this.SIGNUP_STORE_ID);
    }
    componentDidUpdate() {
        if (this.state.isLoggedIn !== null) {
            if (!this.state.isLoggedIn) {
                let router = this.context.router;
                router.push('/');
            }
            else if (!this.state.doneSignUp) {
                let router = this.context.router;
                router.push('/datos');
            } else {
                // TODO redirect to last url before reload
                // let url = window.APP.targetURL;
                // if (url.indexOf('/app/') !== -1) {
                //     if (url.indexOf('/app/home') == -1) {
                //         if (!window.APP.redirectDone) {
                //             window.APP.redirectDone = true;
                //             let router = this.context.router;
                //             router.push(url);
                //         }
                //     }
                // }
            }
        }
    }
    // Store callback
    _onChange = () => {
        this.setState({
            isLoggedIn: LoginStore.state.get('isLoggedIn'),
            doneSignUp: SignUpStore.state.get('doneSignUp')
        });
    }
    handleLogout = () => {
        LoginActions.logout();
    }
    handleToggle = () => {
        this.setState({
            drawerIsOpen: !this.state.drawerIsOpen
        });
    }
    handleClose = () => {
        this.setState({
            popoverIsOpen: false,
            drawerIsOpen: false
        });
    }
    handleSettings = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            popoverIsOpen: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            popoverIsOpen: false,
        });
    };
    render() {
        let width = window.innerWidth > 400 ? 400 : window.innerWidth;
        return (
            <div>
                <AppBar
                    title='ÚNETE'
                    style={styles.appbar}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    onTitleTouchTap={this.handleToggle}
                    iconElementRight={<IconButton onClick={this.handleSettings}><SettingsIcon /></IconButton>}
                    />
                <Popover
                    open={this.state.popoverIsOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    animation={PopoverAnimationVertical}
                    >
                    <Menu>
                        <MenuItem
                            onTouchTap={this.handleClose}
                            primaryText="Mi Perfil"
                            containerElement={<Link to="/app/perfil"/>}
                            leftIcon={<AccountIcon/>}/>
                        <MenuItem
                            onTouchTap={this.handleClose}
                            primaryText="Ayuda"
                            containerElement={<Link to="/ayuda"/>}
                            leftIcon={<HelpIcon/>}/>
                        <Divider />
                        <MenuItem
                            primaryText="Salir"
                            leftIcon={<ExitIcon/>}
                            onClick={this.handleLogout}/>
                    </Menu>
                </Popover>
                <Drawer
                    open={this.state.drawerIsOpen}
                    onRequestChange={(open) => {
                        this.setState({
                            drawerIsOpen: open
                        });
                    }}
                    style={styles.drawer}
                    docked={false}
                    width={width*0.8}>
                    <div style={styles.logoContainer}>
                        <img src={require('assets/images/drawer_background.png')} style={styles.image}/>
                        <div style={styles.logo} onTouchTap={this.handleClose}>
                            Diego Martin Recillas
                        </div>
                    </div>
                    <Link to="/app/home" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose} leftIcon={<HomeIcon/>}>
                            <span style={styles.menuItem}>
                                Inicio
                            </span>
                        </MenuItem>
                    </Link>
                    <Divider/>
                    <Link to="/app/chat" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose} leftIcon={<ChatIcon/>}>
                            <span style={styles.menuItem}>
                                Chat
                            </span>
                        </MenuItem>
                    </Link>
                    <Link to="/app/curp" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose} leftIcon={<NoteIcon/>}>
                            <span style={styles.menuItem}>
                                CURP
                            </span>
                        </MenuItem>
                    </Link>
                    <Link to="/app/news" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose} leftIcon={<NoteIcon/>}>
                            <span style={styles.menuItem}>
                                Noticias
                            </span>
                        </MenuItem>
                    </Link>
                </Drawer>
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
