import React, { useState, useEffect } from 'react';
import './homepage.css';
import NavBar from './navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { format } from 'date-fns'; // for date formatting
import { collection, getDocs, where, query, orderBy, limit, startAfter, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';


/*
Firestore
│
└─── users (collection)
     │
     └─── [User's UID] (document)
          │
          ├─── userData (subcollection)
          │    └─── [Unique UserData ID] (document)
          │         ├─── email: "user@example.com"
          │         ├─── uid: "User's UID"
          │         └─── username: "user123"
          │
          └─── posts (subcollection)
               └─── [Unique Post ID] (document)
                    ├─── clothesData
                    │    ├─── shirt: "Brand A"
                    │    ├─── pants: "Brand B"
                    │    ├─── dress: "Brand C"
                    │    └─── shoes: "Brand D"
                    ├─── createdAt: Timestamp
                    ├─── imageURL: "https://example.com/image.jpg"
                    ├─── likes: Number
                    └─── dislikes: Number
*/ 


//next steps:

// WHY IS FETCHING THE USERNAME NOT WORKING?

// Figure out Overflow and pulling documents when scrolling 

// iterate through different users in firebase



const Homepage = () => {

  const [currentUser, setCurrentUser] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {

    //fetchin unique usernames 

    const auth = getAuth();
    const currentUser = auth.currentUser;
  
    if (currentUser) {
      // Reference to the userData subcollection for the current user
      const userDataRef = collection(db, "users", currentUser.uid, "userData");
      // Query the userData subcollection for documents where the uid field matches the current user's UID
      const q = query(userDataRef, where("uid", "==", currentUser.uid));
  
  
      getDocs(q).then(querySnapshot => {
        const userDataDoc = querySnapshot.docs.find(doc => doc.data().uid === currentUser.uid);
        if (userDataDoc) {
          // If a document is found, update the state with the username
          setUserInfo(userDataDoc.data());
        } else {
          console.log("User data not found");
        }
      }).catch(error => {
        console.error("Error fetching user data:", error);
      });
    } else {
      console.log("No user is currently logged in");
    }
  
    // fetching post data:

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
  
        // Fetch user document to get the username
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then(docSnap => {
          if (docSnap.exists()) {

            // Update setUserInfo to include the username correctly
            setUserInfo({ username: docSnap.data().username }); 
          }
        }).catch(error => {
          console.error("Error fetching user data:", error);
        });
  
        // Fetch the latest post
        const postsRef = collection(db, "users", user.uid, "posts");
        const q = query(postsRef, orderBy("createdAt", "desc"), limit(1));
        getDocs(q).then(querySnapshot => {
          if (!querySnapshot.empty) {
            const postDoc = querySnapshot.docs[0];
            setLatestPost(postDoc.data()); //this contains the necessary post data
          } else {
            console.log("No posts found for the user with UID:", user.uid);
          }
        }).catch(error => {
          console.error("Error fetching latest post:", error);
        });
      } else {
        console.log("No user is currently logged in");
        setCurrentUser(null);
        setUserInfo({});
        setLatestPost(null);
      }
    });
  }, []);
  

  const handleEmojiClick = (postId, emojiIndex) => {
    // Function body
  };

  return (

    <div>
      <NavBar/>
      <main className="content">
        {latestPost ? (
          <div className="post">
            {/* Display the username */}
            <h2>{userInfo.username || 'User'}'s Latest Post</h2>
            <img src={latestPost.imageURL} alt="Latest Post" />
            <div className="clothes-data">
              <p>👕: {latestPost.clothesData.shirt}</p>
              <p>👖: {latestPost.clothesData.pants}</p>
              <p>👗: {latestPost.clothesData.dress}</p>
              <p>👟: {latestPost.clothesData.shoes}</p>
            </div>
            <div className="engagement">
              <p>👍 {latestPost.likes}</p>
              <p>👎 {latestPost.dislikes}</p>
            </div>
            <p>Posted on: {latestPost.createdAt.toDate().toString()}</p>
          </div>
        ) : (
          <p>Loading latest post...</p>
        )}
      </main>
    </div>
  );
};

export default Homepage;
