import React from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: "AIzaSyAvEREBenMWnr0IkObeDASmv5-5SPMPdC4",
    authDomain: "chat-app-f4581.firebaseapp.com",
    projectId: "chat-app-f4581",
    storageBucket: "chat-app-f4581.appspot.com",
    messagingSenderId: "841263463304",
    appId: "1:841263463304:web:e2f9499233b8563c83d83d",
    measurementId: "G-CVWDS7T8J1"
  })

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

function ChatMessage(props){
  const { text, uid, photoURL, createdAt } = props.message;
  let currentTime = new Date(createdAt * 1000).toLocaleTimeString()
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    // props.setMessageClass(messageClass)
    return (
      <div className={`message ${messageClass}`}> 
      {
        props.imageUrl ?
        <>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <div className='picture_wrapper'>
          <img className='picture' src={props.imageUrl} /> 
          <p>{text}</p>
        </div>
        <span>{currentTime}</span>
        </>

        :
        <>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        {text && <> <p>{text}</p> <span>{currentTime}</span></>}
        </>
        }
        </div>
    )
  }

export { db, storage }
export default  ChatMessage
