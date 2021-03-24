import React, {useState, useRef} from 'react';
import ChatMessage from './ChatMessage'
import firebase from 'firebase/app';
import ImageUpload from './ImageUpload';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const firestore = firebase.firestore();
const auth = firebase.auth();
export { firestore, auth }

function ChatRoom() {
    const dummy = useRef()
  
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ messages ] = useCollectionData(query, {idField: 'id'});
  
    const [ formValue, setFormValue ] = useState('')
    const [ openUploader, setOpenUploader ] = useState(false)
    const [ image, setImage ] = useState(null)
    const [ caption, setCaption ] = useState('')
    const [ id, setId ] = useState('')
    const [ photoUrl, setPhotoUrl ] = useState('')

    // const [ messageClass, setMessageClass ] = useState('')

    const sendMessage = async(e) => {
      e.preventDefault()
      const { uid, photoURL } = auth.currentUser
      setId(uid)
      setPhotoUrl(photoURL)
      await messagesRef.add({
        text:formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('')
  
      dummy.current.scrollIntoView({behavior:'smooth'})
    } 
    return (
      <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} imageUrl={msg.imageUrl}/>)}
       
        <div className={`message`}> 
          {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}

          {/* {image && <img className="post__image" src= {image}  alt="My image"/> } */}

      </div>
        <span ref={dummy}></span>
        
      </main>
        
      {openUploader ? 
        <form >
          <div className={openUploader ? "image" : "hide" }>
            <ImageUpload image={image} setImage={setImage} 
              caption={caption} setCaption={setCaption}
              id={id} photoUrl={photoUrl}
           />
            <button type="button" onClick ={() => setOpenUploader(!openUploader)} className="hamburger_bar">&#8942;</button>
          </div> 
        </form>
        :
        <form onSubmit={sendMessage}>
          <input value= {formValue} onChange={(e)=> setFormValue(e.target.value)} placeholder="say something nice"/>
          <button type='submit' disabled={!formValue}>🕊️</button>
          
          <button type="button" onClick ={() => setOpenUploader(!openUploader)} className="hamburger_bar">&#8942;</button>
        
        </form>
      }

      </>
    )
  }

export default ChatRoom
