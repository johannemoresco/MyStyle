// BEING DONE BY JOHANNE
import React, { useState } from "react"
import "./notifications.css"

// grab user id 
const Notification = () => {
    // get refs to everything 
    class getIDS{
        currUserID = ""
        reqUserID = ""
        friendshipDatabase = ""
        friendRequestDatabase = ""
    }


    const friendRequests = () => {}
        // get the current user id 
        // look thru the friendships database, which will contain the friendships that are formed between two user ids 
        // the stuff on other profile should set up the making friendship relationship 
        // if the friendshhip database already has the current user and the user who sent request, display "Added" or smthh
        // if there is an oncoming friend request and they are not yet friends, have a button that either accepts or denies
        // if accept, update the friendships database to say the two users now have this friendship relationship
        // if they deny, update the database with oncoming friendship requests and delete that request 
       

    
    

    
    
    return(
        <div className="notification-wrapper">
            <link rel="stylesheet" href="notifications.css"></link>
            <h1 className="notification-header"> friend requests 👥 </h1>
            <div className="notifications-box">
            </div>
        </div>

    );
    }


export default Notification
