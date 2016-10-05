import APP_CONSTANTS from 'app/constants/AppConstants';
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import LoginActions from 'app/actions/LoginActions';
import { Collection, Model } from 'backbone';
import _ from 'lodash';

const ActionTypes = APP_CONSTANTS.ActionTypes;

const LoginState = Model.extend({
    defaults: {
        'state': {
            'user': '',
            'password': ''
        }
    }
});

class AppStore extends Store {

    constructor(dispatcher) {
        super('AppStore', dispatcher);
        this.isDebugging = true;

        this.loginState = new LoginState();

        this.bindActions({
            [ActionTypes.SAVE_LOGIN_STATE]: this.saveLoginState
        });
    }

    saveLoginState = (oldState) => {
        let newState = {
            'user': oldState.user.toUpperCase(),
            'password': oldState.password.toUpperCase()
        };

        this.loginState.set({
            'state': newState
        });
        this.update();
    }
}

let appStore = new AppStore(appDispatcher);

export default appStore;
