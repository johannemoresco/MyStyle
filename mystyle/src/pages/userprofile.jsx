// BEING DONE BY SYDNEY

import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getDocs, query, orderBy, collection, collectionGroup, where } from 'firebase/firestore';
import { db } from "../firebase";
import React, { useEffect, useState } from "react";
import NavBar from './navbar';
import './userprofile.css'








const Userprofile = () => {

    const [posts, setPosts] = useState([]); // will hold user's posts
    const [userInfo, setUserInfo] = useState({});
    //const auth = getAuth();
    // const currentUser = auth.currentUser;
    const [currentUser, setCurrentUser] = useState(null);
    //setIAmUser(true);

    // logs out user, brings them back to sign in page
    function LogOut() {
        const handLogOut = () => {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Redirect to home page after successful logout
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.error('Error logging out:', error);
                });
        }
        // makes button that can be clicked for signout
        return (
            <button className="friends" onClick={handLogOut}>
                SIGNOUT
            </button>
        );
    }

    const fetchUserDataAndPosts = async () => {
        const auth = getAuth();
        const currentUser = getAuth().currentUser;
        console.log("I got here baybee");
        console.log(auth);

        if (currentUser/* && currentUser.uid*/) {
            console.log("did we go all the way or was it just a dream");
            try {
                // fetch user data
                console.log("i tried");
                const usersDataRef = collection(db, "users", currentUser.uid, "userData");
                const usersDataQuery = query(usersDataRef, where("uid", "==", currentUser.uid));
                const userDataSnapshot = await getDocs(usersDataQuery);
                const userDataDocument = userDataSnapshot.docs.find(doc => doc.data().uid === currentUser.uid);
                if (userDataDocument) {
                    setUserInfo(userDataDocument.data());
                } else {
                    console.log("User data not found");
                }

                // fetch user posts
                const postsRef = collection(db, "users", currentUser.uid, "posts");
                const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
                const postsSnapshot = await getDocs(postsQuery);
                const fetchedPosts = postsSnapshot.docs.map(doc => doc.data());
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching user data and posts:", error);
            }
        }
    };

    /*console.log(auth);
    console.log("I am auth before useffect");*/
   /* useEffect(() => {
        *//*       const auth = getAuth();
               if (auth.currentUser.uid) {       
       
                   // fetch user data
                   const usersDataRef = collection(db, "users", auth.currentUser.uid, "userData");
                   const usersDataQuery = query(usersDataRef, where("uid", "==", auth.currentUser.uid));
       
                   getDocs(usersDataQuery).then(querySnapshot => {
                       const userDataDocument = querySnapshot.docs.find(doc => doc.data().uid === auth.currentUser.uid);
                       if (userDataDocument) {
                           setUserInfo(userDataDocument.data());
                       } else {
                           console.log("user data not found");
                       }
                   }).catch(error => {
                       console.error("error fetching user data");
                       console.log("wowza");
                   });
       
                   // fetch user posts
       
                   const postsRef = collection(db, "users", auth.currentUser.uid, "posts");
                   const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
       
                   getDocs(postsQuery).then(querySnapshot => {
                       const fetchedPosts = querySnapshot.docs.map(doc => doc.data());
                       setPosts(fetchedPosts);
                   }).catch(error => {
                       console.error("error fetching post");
                   });
       
               }*//*



        await fetchUserDataAndPosts();



    }, [iAmUser]);*/

    /*useEffect({ // Add async keyword here
        await fetchUserDataAndPosts(); // Use await here
    }, [iAmUser]);*/

   /* useEffect(() => {
        const fetchData = async () => {
            await fetchUserDataAndPosts();
        };

        fetchData();
    }, [iAmUser]);*/

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                fetchUserDataAndPosts();
            } else {
                setCurrentUser(null);
                setUserInfo({});
            }
        });
    }, []);

    return (
        <div>
            <NavBar />
            <div className='wrapper'>
                <link rel="stylesheet" href="userprofile.css"></link>
                <div className="profile-header">
                    <div className="profile-info">
                        <div className="header1"> {userInfo.username}'s Drippy Closet </div>
                        <LogOut />
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
                        <div className="p">YOU ARE BAD AT HAVING YOUR POSTS RENDER WHY OH WHYYYY</div>
                    </div>

                )}

                <div className="bottom-space" />


            </div>
        </div>
    );

}


export default Userprofile