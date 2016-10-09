import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import appDispatcher from 'app/dispatcher/AppDispatcher';

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

export default class LoginActions {
    static saveLoginState(loginState) {
        appDispatcher.dispatch(
            login.SAVE_LOGIN_STATE,
            loginState
        );
    }
}
