// Utils
import CookiesManager from 'app/utils/cookiesManager';
// React
import React, { PropTypes } from 'react';
// Material UI Components
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// Components
import FBPage from 'app/components/misc/FBPage';
// Textos
import { AyudaTxt } from 'assets/texts/AyudaTxt';

export default class Mensajes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: true,
            isLoadingFBPage: true,
            isFirstTime: this.readCookie()
        }
    }

    componentDidMount() {
        window.FB.Event.subscribe('xfbml.render', this._facebookPageFinishedLoading);
    }

    componentWillUnmount() {
        window.FB.Event.unsubscribe('xfbml.render', this._facebookPageFinishedLoading);
    }

    _facebookPageFinishedLoading = () => {
        this.setState({
            isLoadingFBPage: false
        })
    }

    readCookie = () => {
        let cookie = CookiesManager.readCookie('messages_isFirstTime');
        if (cookie == null) {
            return true;
        } else {
            return cookie == 'false' ? false : true;
        }
    }

    handleDialogOK = () => {
        CookiesManager.createCookie('messages_isFirstTime', 'false', 99999);
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
        let width = window.innerWidth;
        let height = Math.round(window.innerHeight * 1.01);
        let rippleStyle = {transform: 'scale(1)'};

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
                        title={AyudaTxt.Mensaje.title}
                        actions={actions}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleDialogClose}
                        >
                        <p>
                            {AyudaTxt.Mensaje.text}
                        </p>
                    </Dialog>
                }
                <div style={{marginTop: 10}} className="facebook prevent-reload">
                    <div hidden={!this.state.isLoadingFBPage} className='facebook loader-container'>
                        <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                    </div>
                    <div className='facebook messages container'>
                        <FBPage
                            appId="1100956576688933"
                            href="https://www.facebook.com/unetecomunidad"
                            tabs={['messages']}
                            locale={'es_MX'}
                            smallHeader={true}
                            hideCover={true}
                            width={width}
                            height={height}/>
                    </div>
                </div>
            </div>
        )
    }
}
