import APP_CONSTANTS from 'app/constants/AppConstants';
import AppDispatcher from 'app/dispatcher/AppDispatcher';

const actionType = APP_CONSTANTS.ActionTypes;

export default class LoginActions {
    static login(data) {
        AppDispatcher.dispatch(actionType.LOGIN, data);
    }
}
