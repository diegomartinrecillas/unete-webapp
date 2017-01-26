// Utils
import CookiesManager from 'app/utils/cookiesManager';
// React
import React from 'react';
// Material UI Components
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// Components
import FBComments from 'app/components/misc/FBComments';
// Textos
import { AyudaTxt } from 'assets/texts/AyudaTxt';

export default class Chat extends React.Component {
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
        let cookie = CookiesManager.readCookie('chat_isFirstTime');
        if (cookie == null) {
            return true;
        } else {
            return cookie == 'false' ? false : true;
        }
    }

    handleDialogOK = () => {
        CookiesManager.createCookie('chat_isFirstTime', 'false', 99999);
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
                        title={AyudaTxt.Foro.title}
                        actions={actions}
                        modal={false}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleDialogClose}
                        >
                        <p>
                            {AyudaTxt.Foro.text}
                        </p>
                    </Dialog>
                }
                <div style={{marginTop: 10}} className="facebook prevent-reload">
                    <div hidden={!this.state.isLoadingFBPage} className='facebook loader-container'>
                        <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                    </div>
                    <FBComments className='facebook comments container'
                        appId="1100956576688933"
                        href="https://www.facebook.com/unetecomunidad"
                        width={'100%'}
                        numPosts={10}
                        colorScheme={'light'}
                        locale="es_MX"/>
                </div>
            </div>
        )
    }
}
