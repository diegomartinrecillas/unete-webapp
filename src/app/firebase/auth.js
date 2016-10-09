import React, { Component } from 'react';
import { firebaseAuth } from 'app/firebase/firebase';

let requireAuth = (nextState, replace) => {
    if (firebaseAuth.currentUser === null) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

export default requireAuth;
