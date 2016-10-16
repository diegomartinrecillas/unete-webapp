// React
import React from 'react';
// Material UI Components
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// Material Icons
import ChevronLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';

export default class Ayuda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    goBack = () => {
        window.history.back();
    }
    render() {
        return (
            <div>
                <div style={styles.container}>
                    MI PERFIL
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        paddingTop: '2%',
        paddingLeft: '2%',
        paddingRight: '2%',
        paddingBottom: '2%',
        textAlign: 'center'
    }
}
