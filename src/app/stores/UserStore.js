// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
import USER_CONSTANTS from 'app/constants/UserConstants';
// Firebase
import { firebaseAuth, firebaseDatabase } from 'app/firebase/firebase';
// Backbone
import { Collection, Model } from 'backbone';

const UserState = Model.extend({
    defaults: {
        name: '',
        lastName1: '',
        lastName2: '',
        cellphone: ''
    }
});

const user = USER_CONSTANTS.USER_ACTIONS;

class UserStore extends Store {
    constructor() {
        const DEBUG = false;
        super('UserStore', DEBUG);
        
        this.state = new UserState();
        this.state.on('change', this.update, this);

        this.bindActions({
            [user.GET_USER_INFO]: this.onGetUserInfo
        });

    }

    onGetUserInfo = () => {
        if (firebaseAuth.currentUser !== null) {
            let uid = firebaseAuth.currentUser.uid;
            firebaseDatabase.ref('/users/' + uid).once('value')
                .then((snapshot) => {
                    let name = snapshot.val().name;
                    let lastName1 = snapshot.val().lastName1;
                    let lastName2 = snapshot.val().lastName2;
                    let cellphone = snapshot.val().cellphone;
                    let cct = snapshot.val().cct;
                    this.state.set({
                        name: name,
                        lastName1: lastName1,
                        lastName2: lastName2,
                        cellphone: cellphone,
                        cct: cct
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

let userStore = new UserStore(appDispatcher);
appDispatcher.register(userStore);

export default userStore;
