import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const auth = firebase.auth();

function SignIn(){

    const signInWithGoogle = () =>{
      const provider =  new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
    <button className="sign-in" onClick={signInWithGoogle}> Sign In with Google</button>
    )
  }

export default SignIn
