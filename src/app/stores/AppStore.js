import APP_CONSTANTS from 'app/constants/AppConstants';
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import LoginActions from 'app/actions/LoginActions';

const ActionTypes = APP_CONSTANTS.ActionTypes;

class AppStore extends Store {

    constructor() {
        super('AppStore');
        this.isDebugging = true;

        this.defineStore({
            'count': 0,
            'loginState': {
                'extraValue': 'extraValue'
            },
            'hello': new String('')
        });

        this.bindActions({
            [ActionTypes.SAVE_LOGIN_STATE]: this.saveLoginState
        });
    }

    saveLoginState = (loginState) => {
        let user = loginState['user'];
        let password = loginState['password'];
        user = user.toUpperCase();
        password = password.toUpperCase();

        let count = this.get('count');
        count ++;

        this.set({
            'hello': 'mundo',
            'count': count,
            'loginState': {
                'user': user,
                'password': password
            }
        });
    }
}

let appStore = new AppStore();
appDispatcher.registerStore(appStore);

export default appStore;
