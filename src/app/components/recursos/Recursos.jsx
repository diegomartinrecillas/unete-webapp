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
    }
    componentDidMount() {
        this.RESOURCES_STORE_ID = ResourcesStore.register(this._onChange);
    }

    componentWillUnmount() {
        ResourcesStore.unregister(this.RESOURCES_STORE_ID);
    }
    _onChange = () => {

    }
    render() {
        let marginTop = -75;
        let width = window.innerWidth;
        let height = window.innerHeight + (-marginTop);
        return (
            <div>
                <iframe
                    style={{
                        width: width,
                        height: height
                    }}
                    src='http://comunidadunete.net/buscador/'/>
            </div>
        );
    }
}
