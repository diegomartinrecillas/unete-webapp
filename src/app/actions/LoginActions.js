import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import appDispatcher from 'app/dispatcher/AppDispatcher';

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

export default class LoginActions {
    static loginWithUserPassword(loginState) {
        appDispatcher.dispatch(
            login.LOGIN_WITH_USER_PASSWORD,
            loginState
        );
    }
}
