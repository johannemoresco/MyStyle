// BEING DONE BY SYDNEY

/*

    ON THERE has username
    who you follow
    ON THERE pfp
    ON THERE KINDA all of your fits ever

    IN PROGRESS choose your favorite three

*/
import './userprofile.css'
import { useEffect, useState } from "react";
//import "smallberg.jpeg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase"
import { v4 } from "uuid";

const Userprofile = () => {
    
    function profile_photo() {
        return //image of thing
    }

    function profile_name() {
        return "Smallberg's Rockin Closet";
    }

    function yourFriends(user) {
        return // user.friends.amount + " Friends";
    }

    function yourPost() {
        return //photo
    }

    function setTopThree() {
        return // top three set
    }

    function unSetTopThree() {
        return // take one away from being top three
    }

    function displayFits() {
        return // all the fits ever taken
    }

    return (
        <div className='wrapper'>
            <link rel="stylesheet" href="userprofile.css"></link>
           
            <div className="profile-header">
                <img src="smallberg.jpeg" alt="pfp" />
                <div className="profile-info">
                    <div className="header1"> Smallberg's Sexy Closet </div>
                    <div className="friends">FRIEND LIST</div>
                </div>
            </div> 
            <hr />
            <div className="profile-top-three">
                {/*top three images*/}
                <img src="smallberg.jpeg" alt="pfp" />
                <img src="smallberg.jpeg" alt="pfp" />
                <img src="smallberg.jpeg" alt="pfp" />
            </div>
            <div className="profile-rest-of-images">
                <img src="smallberg.jpeg" alt="pfp" />
                <img src="smallberg.jpeg" alt="pfp" />
                <img src="smallberg.jpeg" alt="pfp" />
            </div>






        </div>

    );

}


/*

    ACCESSABLE BY: PROFILE PIC IN NAVBAR, 
    https://docs.google.com/presentation/d/1zHLfMZQK-1YZTEmax9DEc4kZKvH03G0Nm6-o5POn9nE/edit#slide=id.g2947b929940_0_298

*/


export default Userprofile