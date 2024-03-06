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



//import every page shouldddd have this to get the navigation
import NavBar from './navbar';


const Userprofile = () => {

    return (
        <div>
            <NavBar />
            <div className='wrapper'>
                <link rel="stylesheet" href="userprofile.css"></link>

                <div className="profile-header">
                    <div className="profile-info">
                        <div className="header1"> Smallberg's Sexy Closet </div>
                        <div className="friends">FRIEND LIST</div>
                    </div>
                </div>
                <hr />
                <div className="profile-top-three">
                    <img src="smallberg.jpeg" alt="pfp" />
                    <img src="smallberg.jpeg" alt="pfp" />
                    <img src="smallberg.jpeg" alt="pfp" />
                </div>
                <div className="profile-top-three">
                    <img src="smallberg.jpeg" alt="pfp" />
                    <img src="smallberg.jpeg" alt="pfp" />
                    <img src="smallberg.jpeg" alt="pfp" />
                </div>
                <div className="bottom-space" />

            </div>
        </div>
    );

}


export default Userprofile