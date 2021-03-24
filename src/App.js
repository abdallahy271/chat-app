import React from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Rooms from  './components/Rooms';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

function App() {

  const [ user ] =  useAuthState(auth);
  return (
    <div className="App">
    <Router>
      <header>
          <h1>⚛️🔥💬</h1>
          <SignOut />
        </header>
      <Switch>
          <Route path="/chatroom">
              <ChatRoom />
          </Route>

          <Route path="/">
            <section>
              {user ? <Rooms/>  : <SignIn/>}
            </section>
          </Route>
        </Switch>
    </Router>
    </div>
  );
  
}

export default App;
