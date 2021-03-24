import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { useHistory } from 'react-router-dom';

const auth = firebase.auth();

function SignOut(){
    const history = useHistory();

    function signout() {      
        history.push('/')
        auth.signOut()
    }
    return auth.currentUser && (
      <button className="sign-out" onClick={signout}> Sign Out</button>
    )
  }

export default SignOut
