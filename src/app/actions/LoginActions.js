import APP_CONSTANTS from 'app/constants/AppConstants';
import appDispatcher from 'app/dispatcher/AppDispatcher';

const actionType = APP_CONSTANTS.ActionTypes;

export default class LoginActions {
    static saveLoginState(loginState) {
        appDispatcher.dispatch(
            actionType.SAVE_LOGIN_STATE,
            loginState
        );
    }
}
