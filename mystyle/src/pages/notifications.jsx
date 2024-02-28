// BEING DONE BY JOHANNE
import React, { useState } from "react"
import "./notifications.css"
/*

    shows who wants to friend you
    _____ reacted w emoji to your post

*/

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    class friendRequests{
        // insert backend stuff for gathering the pfp and the username
        // if someone friend requests u 
    }
    class emojiReacts{
        
    }
    return(
        <div className="notification-wrapper">
            <link rel="stylesheet" href="notifications.css"></link>
            <h1 className="notification-header"> notifications  🔔 </h1>
            <div className="notifications-box">
            </div>
        </div>

    );
}


export default Notification
