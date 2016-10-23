// Flux
import Store from 'app/libs/Store';
import appDispatcher from 'app/dispatcher/AppDispatcher';
// Backbone
import { Collection, Model } from 'backbone';

const UserState = Model.extend({
    defaults: {

    }
});

class UserStore extends Store {
    constructor() {
        const DEBUG = false;
        super('UserStore', DEBUG);

        this.state = new UserState();
    }
}

let userStore = new UserStore(appDispatcher);
appDispatcher.register(userStore);

export default userStore;
