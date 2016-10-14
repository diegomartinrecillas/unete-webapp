import { firebaseAuth } from 'app/firebase/firebase';

let requireAuth = (nextState, replace) => {
    if (firebaseAuth.currentUser === null) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export default requireAuth;
