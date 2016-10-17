// React
import React from 'react';
// Flux
import LoginActions from 'app/actions/LoginActions';
import LoginStore from 'app/stores/LoginStore';
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
    logo: {
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        lineHeight: '64px',
        fontWeight: 400,
        backgroundColor: primary,
        paddingLeft: '24px',
        marginBottom: '8px'
    },
    link: {
        textDecoration: 'none',
        boxSizing: 'border-box',
        display: 'block'
    },
    activeLink: {
        backgroundColor: 'rgba(0,0,0,.2)'
    },
    menuItem: {
        fontSize: 20
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
            drawerIsOpen: false,
            popoverIsOpen: false
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
                router.push('/');
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
        return (
            <div>
                <AppBar
                    title='ÚNETE'
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
                    docked={false}
                    width={200}>
                    <div style={styles.logo}
                        onTouchTap={this.handleClose}>
                        ÚNETE
                    </div>
                    <Link to="/app/home" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose} leftIcon={<HomeIcon/>}>
                            <span style={styles.menuItem}>
                                Inicio
                            </span>
                        </MenuItem>
                    </Link>
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
                </Drawer>

                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
