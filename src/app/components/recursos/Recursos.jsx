// Utils
import CookiesManager from 'app/utils/cookiesManager';
// React
import React from 'react';
// Material UI Components
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// Textos
import { AyudaTxt } from 'assets/texts/AyudaTxt';

const styles = {
    recursos: {
        width: '100%',
        heght: '100%'
    }
}
export default class Recursos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: true,
            isLoadingIframe: true,
            isFirstTime: this.readCookie()
        }
    }

    componentDidMount() {
        document.getElementById('iframe-recursos').addEventListener('load', this._iframeFinishedLoading);
    }

    componentWillUnmount() {
        document.getElementById('iframe-recursos').removeEventListener('load', this._iframeFinishedLoading);
    }

    _iframeFinishedLoading = () => {
        this.setState({
            isLoadingIframe: false
        })
    }

    readCookie = () => {
        let cookie = CookiesManager.readCookie('resources_isFirstTime');
        if (cookie == null) {
            return true;
        } else {
            return cookie == 'false' ? false : true;
        }
    }

    handleDialogOK = () => {
        CookiesManager.createCookie('resources_isFirstTime', 'false', 99999);
        this.handleDialogClose();
    }

    handleDialogOpen = () => {
        this.setState({
            dialogOpen: true
        });
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        let marginTop = -75;
        let width = window.innerWidth;
        let height = window.innerHeight + (-marginTop);
        let rippleStyle = {transform: 'scale(1)'}

        const actions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDialogClose}
                />,
            <FlatButton
                label="No Volver a Mostrar"
                secondary={true}
                onTouchTap={this.handleDialogOK}
                />,
        ];

        return (
            <div>
                {this.state.isFirstTime &&
                    <Dialog
                        title={AyudaTxt.Recursos.title}
                        actions={actions}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleDialogClose}
                        >
                        <p>
                            {AyudaTxt.Recursos.text}
                        </p>
                    </Dialog>
                }
                <div hidden={!this.state.isLoadingIframe} className='facebook loader-container'>
                    <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                </div>
                <iframe
                    className="recursos container"
                    style={{
                        width: width,
                        height: height
                    }}
                    id='iframe-recursos'
                    src='https://www.uneteya.org/buscador/'/>
            </div>
        );
    }
}
