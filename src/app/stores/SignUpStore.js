// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import SIGNUP_CONSTANTS from 'app/constants/SignUpConstants';
// Firebase
import { firebaseAuth } from 'app/firebase/firebase';
// Backbone
import { Collection, Model } from 'backbone';

const SignUpState = Model.extend({
    defaults: {

    }
});

const signUp = SIGNUP_CONSTANTS.SIGNUP_ACTIONS;

class SignUpStore extends Store {

    constructor() {
        super('SignUpStore', true);

        this.state = new SignUpState();
        this.bindActions({
            [signUp.SIGNUP_WITH_EMAIL]: this.signUpWithEmail,
        });
    }

    signUpWithEmail(data) {
        let email = data['email'];
        let password = data['password'];
        let router = data['router'];

        firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            let path = '/app/home';
            router.push(path);
        })
        .catch((error) => {
            console.log(error);
        });
    }
}

let signUpStore = new SignUpStore(appDispatcher);
appDispatcher.register(signUpStore);

export default signUpStore;
