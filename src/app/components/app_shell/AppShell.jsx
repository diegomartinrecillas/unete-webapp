import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { primary, accent } from 'app/components/commonStyles';

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: '24px',
        color: 'white',
        lineHeight: '64px',
        fontWeight: 300,
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
    }
}

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
                    <Link to="/app/home" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>HOME</MenuItem>
                    </Link>
                    <Link to="/app/chat" style={styles.link} activeStyle={styles.activeLink}>
                        <MenuItem onTouchTap={this.handleClose}>CHAT</MenuItem>
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
