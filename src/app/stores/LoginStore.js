import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import LoginActions from 'app/actions/LoginActions';

import { Collection, Model } from 'backbone';

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

class LoginStore extends Store {
    constructor() {
        super('LoginStore', true);
        this.bindActions({
            [login.LOGIN_WITH_USER_PASSWORD]: this.loginWithUserPassword
        });
    }
    loginWithUserPassword = (user, password) => {

    }
}

let loginStore = new LoginStore();
appDispatcher.register(loginStore);

export default loginStore;
