// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import SIGNUP_CONSTANTS from 'app/constants/SignUpConstants';
import LoginActions from 'app/actions/LoginActions';

// Firebase
import { firebaseAuth } from 'app/firebase/firebase';
// Backbone
import { Collection, Model } from 'backbone';

const SignUpState = Model.extend({
    defaults: {
        isPasswordReset: false,
        isDoneSignUp: false,
        isSigningUp: false,
        signUpError: ''
    }
});

const signUp = SIGNUP_CONSTANTS.SIGNUP_ACTIONS;

class SignUpStore extends Store {

    constructor() {
        const DEBUG = true;
        super('SignUpStore', DEBUG);

        this.state = new SignUpState();
        this.bindActions({
            [signUp.RESET_PASSWORD_WITH_EMAIL]: this.resetPasswordWithEmail,
            [signUp.SIGNUP_WITH_EMAIL]: this.signUpWithEmail,
            [signUp.CHECK_SIGNUP_DONE]: this.checkSignUpDone
        });
    }

    checkSignUpDone = () => {

    }

    resetPasswordWithEmail = (data) => {
        let email = data['email'];

        // firebaseAuth.sendPasswordResetEmail(email)
        // .then((result) => {
        //     this.state.set('isPasswordReset', true);
        //     this.update();
        //     this.state.set('isPasswordReset', false);
        // })
        // .catch((result) => {
        //     this.state.set('isPasswordReset', true);
        //     this.update();
        //     this.state.set('isPasswordReset', false);
        // });
        this.state.set('isPasswordReset', true);
            this.update();
            this.state.set('isPasswordReset', false);

    }

    signUpWithEmail = (data) => {
        let email = data['email'];
        let password = data['password'];

        this.state.set('isSigningUp', true);
        this.update();

        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            LoginActions.checkLoggedIn();
            this.state.set('isSigningUp', false);
            this.update();
        })
        .catch((error) => {
            console.log(error);
            LoginActions.checkLoggedIn();
            if (error.code == 'auth/email-already-in-use') {
                console.log('en uso');
                this.state.set('signUpError', 'Este correo ya está en uso');
            }
            this.state.set('isSigningUp', false);
            this.update();
        });
    }
}

let signUpStore = new SignUpStore(appDispatcher);
appDispatcher.register(signUpStore);

export default signUpStore;
