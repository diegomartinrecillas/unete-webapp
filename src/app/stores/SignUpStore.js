// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import SIGNUP_CONSTANTS from 'app/constants/SignUpConstants';
import LOGIN_CONSTANTS from 'app/constants/LoginConstants';
import LoginActions from 'app/actions/LoginActions';
import UserActions from 'app/actions/UserActions';

// Firebase
import { firebaseAuth, firebaseDatabase } from 'app/firebase/firebase';
// Backbone
import { Collection, Model } from 'backbone';

const SignUpState = Model.extend({
    defaults: {
        doneSignUp: false,
        isCheckingFinished: false,
        isPasswordReset: false,
        isDoneSignUp: false,
        isSigningUp: false,
        isSignUpError: false,
        signUpError: ''
    }
});

const signUp = SIGNUP_CONSTANTS.SIGNUP_ACTIONS;
const login = LOGIN_CONSTANTS.LOGIN_ACTIONS;

class SignUpStore extends Store {

    constructor() {
        const DEBUG = false;
        super('SignUpStore', DEBUG);

        this.state = new SignUpState();
        this.bindActions({
            [signUp.RESET_PASSWORD_WITH_EMAIL]: this.resetPasswordWithEmail,
            [signUp.SIGNUP_WITH_EMAIL]: this.signUpWithEmail,
            [signUp.CHECK_SIGNUP_DONE]: this.checkSignUpDone,
            [signUp.RESET_ERROR]: this.resetError,
            [signUp.SET_SIGNUP_DATA]: this.setSignUpData,
            [login.LOGOUT]: this.resetSignUpDone
        });
    }

    checkSignUpDone = () => {
        if (firebaseAuth.currentUser !== null) {

            this.state.set('isCheckingFinished', true);
            this.update();

            let uid = firebaseAuth.currentUser.uid;
            firebaseDatabase.ref('/users/' + uid).once('value')
            .then((snapshot) => {
                UserActions.getUserInfo();
                let doneSignUp = snapshot.val().doneSignUp;
                this.state.set('doneSignUp', doneSignUp);
                this.state.set('isCheckingFinished', false);
                this.update();
            })
            .catch((error) => {
                console.log(error);
                this._setDoneSignUpFalse();
                this.state.set('isCheckingFinished', false);
                this.update();
            });
        }
    }

    resetPasswordWithEmail = (data) => {
        let email = data['email'];

        firebaseAuth.sendPasswordResetEmail(email)
        .then((result) => {
            this.state.set('isPasswordReset', true);
            this.update();
            this.state.set('isPasswordReset', false);
        })
        .catch((result) => {
            this.state.set('isPasswordReset', true);
            this.update();
            this.state.set('isPasswordReset', false);
        });
    }

    signUpWithEmail = (data) => {
        let email = data['email'];
        let password = data['password'];

        this.state.set('isSigningUp', true);
        this.update();

        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            this._setDoneSignUpFalse();
            this.update();
            LoginActions.checkLoggedIn();
        })
        .catch((error) => {
            this._signUpError(error);
            LoginActions.checkLoggedIn();
            this.state.set('isSigningUp', false);
            this.update();
        });
    }

    setSignUpData = (data) => {
        console.log(data);

        let name = data['name'];
        let lastName1 = data['lastName1'];
        let lastName2 = data['lastName2'];
        let cellphone = data['cellphone'];
        let cct = data['cct'];

        if (firebaseAuth.currentUser !== null) {
            let userId = firebaseAuth.currentUser.uid;
            firebaseDatabase.ref('users/' + userId).set({
                doneSignUp: true,
                aceptoAvisoDePrivacidad: true,
                name: name,
                lastName1: lastName1,
                lastName2: lastName2,
                cellphone: cellphone,
                cct: cct
            })
            .then((result) => {
                this.state.set('doneSignUp', true);
                this.update();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    resetError = () => {
        this.state.set('isSignUpError', false);
        this.state.set('signUpError', '');
    }

    resetSignUpDone = () => {
        this.state.set('doneSignUp', false);
    }

    _signUpError = (error) => {
        if (error.code == 'auth/email-already-in-use') {
            this.state.set('signUpError', 'Este correo ya está en uso');
        } else {
            this.state.set('signUpError', 'Servicio no disponible, intenta mas tarde');
        }
        this.state.set('isSignUpError', true);
    }

    _setDoneSignUpFalse = () => {
        if (firebaseAuth.currentUser !== null) {
            let userId = firebaseAuth.currentUser.uid;
            firebaseDatabase.ref('users/' + userId).set({
                doneSignUp: false
            })
            .then((result) => {
                this.state.set('doneSignUp', false);
            });
        }
    }
}

let signUpStore = new SignUpStore(appDispatcher);
appDispatcher.register(signUpStore);

export default signUpStore;
