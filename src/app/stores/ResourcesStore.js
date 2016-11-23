import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import ResourcesActions from 'app/actions/ResourcesActions';
import RESOURCES_CONSTANTS from 'app/constants/ResourcesConstants';

const resources = RESOURCES_CONSTANTS.RESOURCES_ACTIONS;

class ResourcesStore extends Store {
    constructor() {
        const DEBUG = false;
        super('ResourcesStore', DEBUG);
    }
}

let resourcesStore = new ResourcesStore();
appDispatcher.register(resourcesStore);

export default resourcesStore;
