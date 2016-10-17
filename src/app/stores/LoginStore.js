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
        isLoginError: false,
        loginErrorMessage: ''
    }
});

const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

class LoginStore extends Store {

    constructor() {
        const DEBUG = false;
        super('LoginStore', DEBUG);

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
        this.state.set('isLoginError', false);
    }

    loginWithEmail = (data) => {
        let email = data['email'];
        let password = data['password'];

        this.state.set('isLoggingIn', true);
        this.state.set('isLoginError', false);
        this.update();

        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            this.state.set('isLoggedIn', true);
            this.state.set('isLoginError', false);
            this.state.set('isLoggingIn', false);
            this.update();
        })
        .catch((error) => {
            console.log(error);
            if (error.code == "auth/network-request-failed") {
                this.state.set('loginErrorMessage', 'No hay conexión a Internet');
            } else if (error.code == "auth/user-not-found") {
                this.state.set('loginErrorMessage', 'Usuario y/o contreseña incorrectos');
            } else if (error.code == "auth/wrong-password") {
                this.state.set('loginErrorMessage', 'Usuario y/o contreseña incorrectos');
            }else {
                this.state.set('loginErrorMessage', 'Servicio no disponible, intenta mas tarde');
            }
            this.state.set('isLoginError', true);
            this.state.set('isLoggingIn', false);
            this.update();
        });

    }
}

let loginStore = new LoginStore();
appDispatcher.register(loginStore);

export default loginStore;
