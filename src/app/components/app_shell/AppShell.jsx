import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class AppShell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: false
        }
    }
    handleToggle = () => {
        this.setState({
            drawerIsOpen: !this.state.drawerIsOpen
        });
    }
    handleClose = () => {
        this.setState({
            drawerIsOpen: false
        });
    }
    render() {
        return (
            <div>
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
                        MENÚ
                    </div>
                    <Link to="/app/menu" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Principal</MenuItem>
                    </Link>
                    <Link to="/app/chat" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Chat</MenuItem>
                    </Link>
                </Drawer>
                <AppBar
                    title='ÚNETE'
                    onLeftIconButtonTouchTap={this.handleToggle}
                    onTitleTouchTap={this.handleToggle}
                    />
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: '24px',
        color: 'rgb(255, 255, 255)',
        lineHeight: '64px',
        fontWeight: 300,
        backgroundColor: '#D78500',
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
    }
}
