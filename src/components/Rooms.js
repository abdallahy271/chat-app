import React from 'react'
import { useHistory } from 'react-router-dom';

function Rooms() {
    const history = useHistory();

    return (
        <div>
            <button className="sign-in" onClick={() => history.push('/chatroom')}> Chat Room 1</button>
        </div>
    )
}

export default Rooms
