import APP_CONSTANTS from 'app/constants/AppConstants';
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import LoginActions from 'app/actions/LoginActions';

const ActionTypes = APP_CONSTANTS.ActionTypes;

class AppStore extends Store {

    constructor() {
        super('AppStore');
        this.logger.debug('Initializing AppStore');

        this.defineStore({
            'user': '',
            'password': ''
        });

        this.bindActions({
            [ActionTypes.LOGIN]: this.onLogin
        });
    }

    onLogin = (user, password) => {
        this.set({
            'user': user,
            'password': password,
        });
    }
}

let appStore = new AppStore();

appDispatcher.registerStore(appStore);
export default appStore;
