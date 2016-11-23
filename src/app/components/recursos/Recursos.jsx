// React
import React from 'react';
// Flux
import ResourcesStore from 'app/stores/ResourcesStore';
import ResourcesActions from 'app/actions/ResourcesActions';

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
            isLoadingIFrame: true
        }
    }
    componentDidMount() {
        this.RESOURCES_STORE_ID = ResourcesStore.register(this._onChange);
        document.getElementById("iframe-recursos").addEventListener('load', this._iFrameFinishedLoading);
    }

    componentWillUnmount() {
        ResourcesStore.unregister(this.RESOURCES_STORE_ID);
    }

    _onChange = () => {

    }

    _iFrameFinishedLoading = () => {
        this.setState({
            isLoadingIFrame: false
        })
    }

    render() {
        let marginTop = -75;
        let width = window.innerWidth;
        let height = window.innerHeight + (-marginTop);
        let rippleStyle = {transform: 'scale(1)'}
        return (
            <div>
                <div hidden={!this.state.isLoadingIFrame} className='facebook loader-container'>
                    <div className='loader uil-ripple-css' style={rippleStyle}><div></div><div></div></div>
                </div>
                <iframe
                    style={{
                        width: width,
                        height: height
                    }}
                    id='iframe-recursos'
                    src='http://comunidadunete.net/buscador/'/>
            </div>
        );
    }
}
