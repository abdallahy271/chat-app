import React, { useState } from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import firebase from 'firebase/app';
import { storage } from './ChatMessage'
import { firestore, auth } from './ChatRoom'

function ImageUpload( { image, setImage, caption, setCaption, id, photoUrl } ) {

    const handleChange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload =(e) => {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
            },
            (error) => {
                //Error function
                console.log(error)
                alert(error.message)
            },
            () => {
                //complete function 
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(async (url) => {
                    //post image to firestore
                    await firestore.collection("messages").add({
                        uid,
                        photoURL,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        text:caption,
                        imageUrl: url,

                       
                    })
                    setCaption('')
                    setImage(null)
                })
            }
        )
    }
    return (
        <div className="imageupload">
            {/* <progress className="imageupload__progress" value={progress} max='100'/> */}
                <div>
                    <input className="choose_file"type="file" onChange={handleChange}/>
                    
                    <input value={caption} type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)}/>
                </div>
                    <button onClick={handleUpload}> 
                        <PublishIcon />
                    </button>
            </div>
    )
}

export default ImageUpload;