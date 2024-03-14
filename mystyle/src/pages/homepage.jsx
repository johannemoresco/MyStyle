import React, { useState, useEffect } from 'react';
import './homepage.css';
import NavBar from './navbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, arrayRemove, arrayUnion, orderBy, limit, getDocs, updateDoc, getDoc, doc, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';

const Homepage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        fetchLatestPost(user.uid);
        fetchUsername(user);
      } else {
        setCurrentUser(null);
        setLatestPost(null);
        setUserInfo({});
      }
    });

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const postsRef = collection(db, 'posts');
    const snapshot = await getDocs(postsRef);
    const postsPromises = snapshot.docs.map(doc => fetchPostDetails(doc.id));
    const postsDetails = await Promise.all(postsPromises);
    setPosts(postsDetails);
  };

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

  const handleProfileClick = async () => {
    const pathName = userInfo.uid;
    window.location.href = `/otherprofile/${pathName}`
  };

  const handleLike = async (postId) => {
    if (!currentUser) {
  alert("Please log in to like posts");
  return;
}


const userId = currentUser.uid;
const updatedPosts = posts.map(post => {
  if (post.id === postId) {
    const isLiked = post.likedBy?.includes(userId);
    if (isLiked) {
      return {
        ...post,
        likes: post.likes - 1,
        likedBy: post.likedBy.filter(id => id !== userId),
      };
    } else {
      return {
        ...post,
        likes: post.likes + 1,
        likedBy: [...(post.likedBy || []), userId],
      };
    }
  }
  return post;
});


setPosts(updatedPosts);


try {
  const postRef = doc(db, "posts", postId);
 
  await runTransaction(db, async (transaction) => {
    const postSnapshot = await transaction.get(postRef);
    if (!postSnapshot.exists()) {
      throw new Error("Post does not exist!");
    }


    const postData = postSnapshot.data();
    const likedBy = postData.likedBy || [];
    let likes = postData.likes || 0;


    if (likedBy.includes(userId)) {
      // If user has already liked the post, unlike it
      transaction.update(postRef, {
        likedBy: arrayRemove(userId),
        likes: likes - 1
      });
    } else {
      // If user has not liked the post, like it
      transaction.update(postRef, {
        likedBy: arrayUnion(userId),
        likes: likes + 1
      });
    }
  });


  console.log("Like transaction successfully committed!");
} catch (error) {
  console.error("Failed to update like status in Firestore:", error);
}
};

  const handleDislike = async (postId) => {
    if (!currentUser) {
      alert("Please log in to dislike posts");
      return;
    }
  
    const userId = currentUser.uid;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isDisliked = post.dislikedBy?.includes(userId);
        if (isDisliked) {
          return {
            ...post,
            dislikes: post.dislikes - 1,
            dislikedBy: post.dislikedBy.filter(id => id !== userId),
          };
        } else {
          return {
            ...post,
            dislikes: post.dislikes + 1,
            dislikedBy: [...(post.dislikedBy || []), userId],
          };
        }
      }
      return post;
    });

    setPosts(updatedPosts);

    try {
      const postRef = doc(db, "posts", postId);
      await runTransaction(db, async (transaction) => {
        const postSnapshot = await transaction.get(postRef);
        if (!postSnapshot.exists()) {
          throw new Error("Post does not exist!");
        }

        const postData = postSnapshot.data();
        const dislikedBy = postData.dislikedBy || [];
        let dislikes = postData.dislikes || 0;

        if (dislikedBy.includes(userId)) {
          transaction.update(postRef, {
            dislikedBy: arrayRemove(userId),
            dislikes: dislikes - 1
          });
        } else {
          transaction.update(postRef, {
            dislikedBy: arrayUnion(userId),
            dislikes: dislikes + 1
          });
        }
      });

      console.log("Dislike transaction successfully committed!");
    } catch (e) {
      console.error("Failed to update dislike status in Firestore:", e);
    }
  };

  const fetchLatestPost = (userId) => {
    const postsRef = collection(db, "users", userId, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"), limit(1));

    getDocs(postsQuery).then(querySnapshot => {
      if (!querySnapshot.empty) {
        const postDoc = querySnapshot.docs[0];
        setLatestPost({ id: postDoc.id, ...postDoc.data() });
      } else {
        console.log("No posts found.");
      }
    }).catch(error => {
      console.error("Error fetching latest post:", error);
    });
  };

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

  return (
    <div>
      <NavBar/>
      {posts.map((post, index) => (
        <div key={index} className="post">
          <h2 onClick={handleProfileClick}>@{post.username || 'User'}'s Post</h2>
                 {/* <img src={post.imageURL} alt="Post" className="post-image" /> */}

            <div className='photo-outfit'>
              <img src={post.imageURL} alt="Post" className="post-image" />
            </div>



          <div className="engagement">
            <p onClick={() => handleLike(post.id)}>👍 Likes: {post.likes}</p>
            <p onClick={() => handleDislike(post.id)}>👎 Dislikes: {post.dislikes}</p>
          </div>
          {post.clothesData && (
            <div className="clothes-data">
              <h3>Clothes:</h3>
              {Object.entries(post.clothesData).map(([key, value]) => (
                <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</p>
              ))}
            </div>
          )}
          <div className="post-date">
            <p>Posted on: {new Date(post.createdAt.seconds * 1000).toLocaleDateString("en-US")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;