// BEING DONE BY SYDNEY

import { getDocs, query, orderBy, collection, where } from 'firebase/firestore';
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import NavBar from './navbar';
import './otherprofile.css'
import { useParams } from 'react-router-dom';


// LOOK AT ALL SPOTS THAT TAKE AUTH AS A THING

const Otherprofile = () => {

    const [posts, setPosts] = useState([]); // will hold user's posts
    const [userInfo, setUserInfo] = useState({}); // holds the fields in user
    /*const [currentUser, setCurrentUser] = useState(null); // more for mental housekeeping*/
    const { id } = useParams();

    const fetchUserDataAndPosts = async () => {

        // NEEDS TO CHANGE
        
        const currentUser = id;

            try {
                // fetch user data
                const usersDataRef = collection(db, "users", currentUser, "userData");
                const usersDataQuery = query(usersDataRef, where("uid", "==", currentUser));
                const userDataSnapshot = await getDocs(usersDataQuery);
                const userDataDocument = userDataSnapshot.docs.find(doc => doc.data().uid === currentUser);
                if (userDataDocument) {
                    setUserInfo(userDataDocument.data());
                } else {
                    console.log("User data not found");
                }

                // fetch user posts
                const postsRef = collection(db, "users", currentUser, "posts");
                const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
                const postsSnapshot = await getDocs(postsQuery);
                const fetchedPosts = postsSnapshot.docs.map(doc => doc.data());
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching user data and posts:", error);
            }
    };

    useEffect(() => {
        fetchUserDataAndPosts();
    }, );

    return (
        <div>
            <NavBar />
            
            <div className='wrapper'>
                <link rel="stylesheet" href="userprofile.css"></link>
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="header1"> {userInfo.username}'s Closet </div>
                        
                    </div>
                </div>
                <hr />
                {posts.length > 0 ? (
                    <div className="profile-top-three">
                        {posts.map((post, index) => (
                            <div>
                                <img key={index} src={post.imageURL} alt={`Post ${index}`} />

                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="p">Their posts are currently loading. </div>
                    </div>

                )}

                <div className="bottom-space" />


            </div>
        </div>
    );

}


export default Otherprofile