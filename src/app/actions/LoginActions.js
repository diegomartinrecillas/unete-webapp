import APP_CONSTANTS from 'app/constants/AppConstants';
import appDispatcher from 'app/dispatcher/AppDispatcher';

const actionType = APP_CONSTANTS.ActionTypes;

export default class LoginActions {
    static login(user, password) {
        appDispatcher.dispatch(
            actionType.LOGIN,
            user,
            password
        );
    }
}
