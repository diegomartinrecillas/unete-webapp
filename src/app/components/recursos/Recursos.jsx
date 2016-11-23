// React
import React from 'react';
// Flux
import ResourcesStore from 'app/stores/ResourcesStore';
import ResourcesActions from 'app/actions/ResourcesActions';

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
        return (
            <div>
                RECURSOS
            </div>
        );
    }
}
