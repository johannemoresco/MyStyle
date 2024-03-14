/*
Firestore
│
├─── users (collection)
│    └─── [User's UID] (document)
│         ├─── userData (subcollection)
│         └─── posts (subcollection)
│              └─── [Unique Post ID] (document)
│                   ├─── clothesData
│                   ├─── createdAt
│                   ├─── dislikes
│                   ├─── imageURL
│                   └─── likes
│
└─── posts (collection)
     └─── [Unique Post ID] (document)
          ├─── clothesData
          ├─── createdAt
          ├─── dislikes
          ├─── imageURL
          ├─── likes
          └─── postedBy
*/


import React, { useState, useEffect } from 'react';
import './homepage.css';
import NavBar from './navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs, getDoc, doc, runTransaction,increment } from 'firebase/firestore';
import { db } from '../firebase';




const Homepage = () => {


  const [currentUser, setCurrentUser] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);






//////////////////////////////////////// THE HOLY GRAIL OF THIS PROJECT ?????????????????


const collectionRef = collection(db, 'posts');
let documentIds = [];
getDocs(collectionRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      documentIds.push(doc.id);
    });
    console.log(documentIds);
  })
  .catch((error) => {
    console.error("Error getting documents: ", error);
  });


 
useEffect(() => {
  fetchPosts();
}, []);




const fetchPosts = async () => {
  const postsRef = collection(db, 'posts');
  const snapshot = await getDocs(postsRef);
  const documentIds = snapshot.docs.map(doc => doc.id);


  const postsPromises = documentIds.map(id => fetchPostDetails(id));
  const postsDetails = await Promise.all(postsPromises);
  setPosts(postsDetails);
};




//////////////////////////////////////// THE HOLY GRAIL OF THIS PROJECT ?????????????????


const fetchPostDetails = async (id) => {
  const postRef = doc(db, 'posts', id);
  const snapshot = await getDoc(postRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    console.log('No such document!');
    return null;
  }
};




  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //       fetchLatestPost(user.uid);
  //       fetchUsername(user);
  //     } else {
  //       setCurrentUser(null);
  //       setLatestPost(null);
  //       setUsernfo({});
  //     }
  //   });
  // }, []);I


// access other user profile logic:
/////////////////////////////////////////////////////////////////////////
    const handleProfileClick = async () => {
        const pathName = userInfo.uid;
        window.location.href = `/otherprofile/${pathName}`
    };




  //like logic:
  /////////////////////////////////////////////////////////////////////////
  const handleLike = async () => {
    if (!latestPost || !currentUser) return;
 
    const postRef = doc(db, "users", currentUser.uid, "posts", latestPost.id);
 
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw new Error("Document does not exist!");
        }
        const data = postDoc.data();
        const newLikesUsers = data.likesUsers || [];
        const index = newLikesUsers.indexOf(currentUser.uid);
        let newLikes = data.likes || 0;
 
        if (index === -1) { // If user hasn't liked the post yet, add their ID and increment likes
          newLikesUsers.push(currentUser.uid);
          newLikes = increment(1);
        } else { // If user already liked the post, remove their ID and decrement likes
          newLikesUsers.splice(index, 1);
          newLikes = increment(-1);
        }
 
        transaction.update(postRef, { likesUsers: newLikesUsers, likes: newLikes });
 
        // Optimistically update local state
        setLatestPost(prev => ({
          ...prev,
          likes: prev.likes + (index === -1 ? 1 : -1), // Increment or decrement the local likes count
          likesUsers: newLikesUsers
        }));
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };






  const handleDislike = async () => {
     if (!latestPost || !currentUser) return;
 
     const postRef = doc(db, "users", currentUser.uid, "posts", latestPost.id);
 
    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw new Error("Document does not exist!");
        }
        const data = postDoc.data();
        let newDislikesUsers = data.dislikesUsers || [];
        const index = newDislikesUsers.indexOf(currentUser.uid);
        let dislikeIncrement = 0;
 
        if (index === -1) { // If user hasn't disliked the post yet, add their ID
          newDislikesUsers.push(currentUser.uid);
          dislikeIncrement = 1; // Prepare to increment the dislikes
        } else { // If user already disliked the post, remove their ID
          newDislikesUsers.splice(index, 1);
          dislikeIncrement = -1; // Prepare to decrement the dislikes
        }
 
        // Now, correctly apply the increment or decrement
        transaction.update(postRef, { dislikesUsers: newDislikesUsers, dislikes: increment(dislikeIncrement) });
 
        // Optimistically update local state to reflect the change
        setLatestPost(prev => ({
          ...prev,
          dislikes: (prev.dislikes || 0) + dislikeIncrement, // Adjust the local dislikes count
          dislikesUsers: newDislikesUsers
        }));
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };
  /////////////////////////////////////////////////////////////////////////








  // fetching the latest post
  /////////////////////////////////////////////////////////////////////////
  const fetchLatestPost = (userId) => {
    const postsRef = collection(db, "users", userId, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"), limit(1));


    getDocs(postsQuery).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const postDoc = querySnapshot.docs[0];
        setLatestPost({ id: postDoc.id, ...postDoc.data() }); // Storing the post data along with its Firestore document ID
      } else {
        console.log("No posts found.");
      }
    }).catch(error => {
      console.error("Error fetching latest post:", error);
    });
  };


  //// fetch username logic
    /////////////////////////////////////////////////////////////////////////


  const fetchUsername = (user) => {
    const userDataRef = collection(db, "users", user.uid, "userData");
    getDocs(userDataRef).then(querySnapshot => {
      const userDataDoc = querySnapshot.docs.find(doc => doc.data().uid === user.uid);
      if (userDataDoc) {
        setUserInfo(userDataDoc.data());
      } else {
        console.log("User data not found.");
      }
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  };


  // const fetchUsername = async (postedByUID) => {
  //   // Assuming username is stored directly under a document with the UID in the 'users' collection
  //   const userRef = doc(db, 'usersData', postedByUID);
  //   const docSnap = await getDoc(userRef);
  //   if (docSnap.exists()) {
  //     // Assuming the username is stored in a field named 'username'. Adjust as needed.
  //     return docSnap.data().username;
  //   } else {
  //     console.log('No such user!');
  //     return 'Unknown User'; // Fallback username
  //   }
  // };






/////////////////////////////////////////////////////////////////////////




  return (
    // <div>
    //   <NavBar/>
    //   <main className="content">
    //     {latestPost ? (
    //         <div className="post" >
    //         <h2 onClick={handleProfileClick}>@{userInfo.username || 'User'}'s Latest Post</h2>


    //         <div className='motto'>
    //         <p>Showcasing Style, One Outfit at a Time.</p>
    //       </div>


    //         <div className='photo-outfit'>
    //           <img src={latestPost.imageURL} alt="Latest Post" className="post-image" />
    //         </div>
           
    //         <div className="engagement">
    //           <p onClick={handleLike}>👍 {latestPost.likes}</p>
    //           <p onClick={handleDislike}>👎 {latestPost.dislikes}</p>
    //         </div>
           
    //         <div className="clothes-data">
    //           <p>👕 - {latestPost.clothesData.shirt}</p>
    //           <p>👖 - {latestPost.clothesData.pants}</p>
    //           <p>👗 - {latestPost.clothesData.dress}</p>
    //           <p>👟 - {latestPost.clothesData.shoes}</p>
    //         </div>
    //         {latestPost.createdAt && (
    //           <div className="Time">
    //             <p>Posted on: {new Date(latestPost.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <div className='loading'>
    //         <p>Loading latest post...</p>
    //       </div>


         
    //     )}
    //   </main>
    // </div>


    // <div>
    //   <NavBar/>
    //   <main className="content">
    //     {posts.length > 0 ? (
    //       posts.map((post) => (
    //         <div key={post.id} className="post">
    //           <h2>@{post.postedBy}'s Latest Post</h2>
    //           <div className='photo-outfit'>
    //             <img src={post.imageURL} alt="Post" className="post-image" />
    //           </div>
    //           <div className="clothes-data">
    //             {/* Display clothes data */}
    //             {post.clothesData && Object.entries(post.clothesData).map(([key, value]) => (
    //               <p key={key}>{value}</p>
    //             ))}
    //           </div>
    //           <div className="Time">
    //             <p>Posted on: {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>
    //           </div>
    //         </div>
    //       ))
    //     ) : (
    //       <div className='loading'>
    //         <p>Loading posts...</p>
    //       </div>
    //     )}
    //   </main>
    // </div>
  //   <div>
  //   <NavBar/>


  //   {posts.map((post, index) => (
  //     <div key={index}>
  //           <h2 onClick={handleProfileClick}>@{post.username || 'User'}'s Latest Post</h2>
  //       <img src={post.imageURL} alt="Post" />
  //       {/* Render other post details */}
       


  //     </div>
  //   ))}
  // </div>
  <div>
    <NavBar/>
    {posts.map((post, index) => (
      <div key={index} className="post">
        <h2 onClick={handleProfileClick}>@{post.username || 'User'}'s Post</h2>
        <img src={post.imageURL} alt="Post" className="post-image" />
       
        {/* Likes and Dislikes */}
        <div className="engagement">
        <p onClick={() => handleLike(post.id)}>👍 Likes: {post.likes}</p>
        <p onClick={() => handleDislike(post.id)}>👎 Dislikes: {post.dislikes}</p>
        </div>


        {/* Clothes Data */}
        {post.clothesData && (
          <div className="clothes-data">
            <h3>Clothes:</h3>
            {Object.entries(post.clothesData).map(([key, value]) => (
              <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
            ))}
          </div>
        )}
       
        {/* Post Creation Date */}
        <div className="post-date">
          <p>Posted on: {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>
        </div>
      </div>
    ))}
  </div>


  );
};


export default Homepage;

