import React from 'react';
import { Link } from 'react-router';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

const styles = {
    container: {
        paddingTop: '5%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingBottom: '5%',
        textAlign: 'center',
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

export default class Shell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: false
        };
    }
    handleToggle = () => this.setState({
        drawerIsOpen: !this.state.drawerIsOpen
    });
    handleClose = () => this.setState({
        drawerIsOpen: false
    });
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
                    <Link to="/login" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Login</MenuItem>
                    </Link>
                    <Link to="/registro" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Registro</MenuItem>
                    </Link>
                    <Link to="/ayuda" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Ayuda</MenuItem>
                    </Link>
                    <Link to="/error" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Error</MenuItem>
                    </Link>
                    <Link to="/chat" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>Chat</MenuItem>
                    </Link>
                </Drawer>
                <AppBar
                    title='ÚNETE'
                    onLeftIconButtonTouchTap={this.handleToggle}
                    onTitleTouchTap={this.handleToggle}
                    />
                <div style={styles.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
