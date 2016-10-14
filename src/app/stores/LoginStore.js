// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import LoginActions from 'app/actions/LoginActions';
// Firebase
import { firebaseAuth } from 'app/firebase/firebase';
// Backbone
import { Collection, Model } from 'backbone';

const LoginState = Model.extend({
    defaults: {
        isLoggedIn: false,
        isLoggingIn: false,
        isChecking: false,
        loginError: false
    }
});

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

class LoginStore extends Store {

    constructor() {
        super('LoginStore', true);

        this.state = new LoginState();

        this.bindActions({
            [login.CHECK_LOGGED_IN]: this.checkLoggedIn,
            [login.LOGIN_WITH_EMAIL]: this.loginWithEmail,
            [login.LOGOUT]: this.logout,
            [login.RESET_ERROR]: this.resetError
        });
    }

    logout = () => {
        firebaseAuth.signOut()
        .then(() => {
            this.state.set('isLoggedIn', false);
            this.update();
        })
        .catch((error) => {
            console.error('Sign Out Error', error);
        });
    }

    checkLoggedIn = () => {
        this.state.set('isChecking', true);
        this.update();
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.state.set('isLoggedIn', true);
                this.state.set('isChecking', false);
                this.update();
            } else {
                this.state.set('isLoggedIn', false);
                this.state.set('isChecking', false);
                this.update();
            }
        });
    }

    resetError = () => {
        this.state.set('loginError', false);
    }

    loginWithEmail = (data) => {
        let email = data['email'];
        let password = data['password'];

        this.state.set('isLoggingIn', true);
        this.state.set('loginError', false);
        this.update();
        
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.state.set('isLoggedIn', true);
            this.state.set('loginError', false);
            this.state.set('isLoggingIn', false);
            this.update();
        })
        .catch((error) => {
            console.log(error);
            this.state.set('loginError', true);
            this.state.set('isLoggingIn', false);
            this.update();
        });

    }
}

let loginStore = new LoginStore();
appDispatcher.register(loginStore);

export default loginStore;
