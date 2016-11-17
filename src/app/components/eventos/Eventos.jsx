// React
import React, { PropTypes } from 'react';
// Material UI Components
import Paper from 'material-ui/Paper'
// Components
import FBPage from 'app/components/misc/FBPage';

export default class Eventos extends React.Component {
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
        let width = window.innerWidth;
        let height = Math.round(window.innerHeight * 1.01);
        let rippleStyle = {transform: 'scale(1)'};
        return (
            <div style={{marginTop: 10}} className="facebook prevent-reload">
                <div hidden={!this.state.isLoadingFBPage} className='facebook loader-container'>
                    <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                </div>
                <div className='facebook messages container'>
                    <FBPage
                        appId="yourFacebookAppId"
                        href="https://www.facebook.com/unetecomunidad"
                        tabs={['events']}
                        locale={'es_MX'}
                        smallHeader={true}
                        hideCover={true}
                        width={width}
                        height={height}/>
                </div>
            </div>
        )
    }
}
