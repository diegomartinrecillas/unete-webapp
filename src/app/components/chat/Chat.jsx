import React from 'react';

import FBComments from 'app/components/misc/FBComments';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingFBPage: true
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
    render() {
        let rippleStyle = {transform: 'scale(1)'};
        return (
            <div style={{marginTop: 10}} className="facebook prevent-reload">
                <div hidden={!this.state.isLoadingFBPage} className='facebook loader-container'>
                    <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                </div>
                <FBComments className='facebook comments container'
                    appId="yourFacebookAppId"
                    href="https://www.facebook.com/unetecomunidad"
                    width={'100%'}
                    numPosts={10}
                    colorScheme={'light'}
                    locale="es_MX"/>
            </div>
        )
    }
}
