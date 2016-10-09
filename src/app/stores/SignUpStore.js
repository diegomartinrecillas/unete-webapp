import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import SIGNUP_CONSTANTS from 'app/constants/SignUpConstants';


import { Collection, Model } from 'backbone';
import _ from 'lodash';

const signUp = SIGNUP_CONSTANTS.SIGNUP_ACTIONS;

class SignUpStore extends Store {

    constructor() {
        super('SignUpStore', true);

        this.bindActions({

        });
    }
}

let signUpStore = new SignUpStore(appDispatcher);
appDispatcher.register(signUpStore);

export default signUpStore;
