// Constants
import SIGNUP_CONSTANTS from 'app/constants/SignUpConstants';
// Dispatcher
import appDispatcher from 'app/dispatcher/AppDispatcher';

const signUp = SIGNUP_CONSTANTS.SIGNUP_ACTIONS;

export default class LoginActions {
    static signUpWithEmail(data) {
        appDispatcher.dispatch(
            signUp.SIGNUP_WITH_EMAIL,
            data
        );
    }
    static resetPasswordWithEmail(data) {
        appDispatcher.dispatch(
            signUp.RESET_PASSWORD_WITH_EMAIL,
            data
        );
    }
}
