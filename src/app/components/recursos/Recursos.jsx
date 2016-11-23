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
        this.RESOURCES_STORE_ID = ResourcesStore.regiser(this._onchange, false);
    }
    componentWillMount() {
        ResourcesStore.unregister(this.RESOURCES_STORE_ID);
    }
    _onChange = () => {

    }
    render() {
        <div>
            RECURSOS
        </div>
    }
}
