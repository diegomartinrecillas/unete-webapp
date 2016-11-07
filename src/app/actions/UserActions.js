import USER_CONSTANTS from 'app/constants/UserConstants';
import appDispatcher from 'app/dispatcher/AppDispatcher';

const user = USER_CONSTANTS.USER_ACTIONS;

export default class UserActions {
    static getUserInfo() {
        appDispatcher.dispatch(
            user.GET_USER_INFO
        );
    }
}
