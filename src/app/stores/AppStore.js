import APP_CONSTANTS from 'app/constants/AppConstants';
import Store from 'app/libs/Store';
import AppDispatcher from 'app/dispatcher/AppDispatcher';
import LoginActions from 'app/actions/LoginActions';

const ActionTypes = APP_CONSTANTS.ActionTypes;

class AppStore extends Store {

    constructor() {
        super('AppStore');
        this.logger.debug('Initializing AppStore');

        this.initialize('hello', null);
        this.initialize('world', null);
    }

    onAction(actionType, data) {
        this.logger.debug(`Received Action ${actionType} with data`, data);
        switch (actionType) {
            case ActionTypes.LOGIN: {
                this.set('hello', data.hello);
                this.set('world', data.world);
                break;
            }
            default: {
                this.logger.debug('Unknown actionType for this store - ignoring');
                break;
            }
        }
    }
}

var appStore = new AppStore();

AppDispatcher.registerStore(appStore);
export default appStore;
