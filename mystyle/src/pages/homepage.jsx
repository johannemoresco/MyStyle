import React, { useState, useEffect } from 'react';
import './homepage.css';

//import every page shouldddd have this to get the navigation
import NavBar from './navbar';

/*
Basic overview of the homepage:
need ...
- create a basic user for people to load up the app
      - need to store/retrieve emoji-count/posts/userID/clothinglinks
- have a get live components to create the scrolling functionality
- debug the navigation bar that hypothetically would work on every page if called

- plan is the cap out the size of posts of users essentially the same layout as the one here, but in future
will replace arbitrary variables with get-live functionalities once firebase is created

FOR APP.js
"

import './App.css';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import Upload from './pages/upload'
//import Homepage from './pages/homepage'

//defining routes for navigation:
import Homepage from './pages/homepage';
import Search from './pages/search';
import Userprofile from './pages/userprofile';
import Notifications from './pages/notifications';

//import Navbar from './components/Navbar';
import Navbar from './pages/navbar';

// tool to reroute page based on the user input
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
"

*/

const Homepage = () =>
{
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: '@Father_Smallberg',
      intro: 'Your daily dose of fashion in style.',
      motto: "Showcasing Style, One Outfit at a Time.",
      emojis: [
        { emoji: '😊', count: 0, clicked: false },
        { emoji: '🤔', count: 0, clicked: false },
        { emoji: '😂', count: 0, clicked: false },
        { emoji: '❤️', count: 0, clicked: false },
        { emoji: '👍', count: 0, clicked: false },
      ],
      clothing: [
        /* https://example.com/shirt*/
        { type: 'shirt', link: 'https://example.com/shirt' },
        { type: 'skirt', link: 'https://example.com/skirt' },
        { type: 'pants', link: 'https://example.com/pants' },
        { type: 'shoes', link: 'https://example.com/shoes' },
      ],
      comments: [],
    },
  ]);

  useEffect(() => {
    const handleScroll = (event) => {
      // Get the current scroll position and the height of the scrollable area
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
  
      // Check if we're at the bottom of the scrollable area (with some tolerance, e.g., 10px before the actual bottom)
      if (scrollHeight - scrollTop <= clientHeight + 10) {
        // Trigger fetching more posts
        fetchMorePosts();
      }
    };
  
    // Add the event listener to the scrollable container
    const element = document.querySelector('.content');
    element.addEventListener('scroll', handleScroll);
  
    // Cleanup the event listener
    return () => element.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchMorePosts = async () => {
    // Function to fetch more posts from the database
    // Update your state with the new posts
  };

  const handleEmojiClick = (postId, emojiIndex) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newEmojis = post.emojis.map((emoji, index) => {
            if (index === emojiIndex) {
              return {
                ...emoji,
                count: emoji.clicked ? emoji.count - 1 : emoji.count + 1,
                clicked: !emoji.clicked
              };
            }
            return emoji;
          });
          return { ...post, emojis: newEmojis };
        }
        return post;
      })
    );
  };

  // complete optional for future ?? #highly doubt
  const addComment = (postId, newComment) => {
    setPosts((prevPosts) => prevPosts.map(post => {
      if (post.id === postId) {
        // Make sure to create a new object for the post and a new array for comments
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  return (
    <div>
      <NavBar/>
      <main className="content">
        <section className="posts">
          {posts.map((post) => (
            <article key={post.id} className="post">
              <div className="post-container">
                <div className="post-left">
                <h2 className="intro">{post.intro}</h2>
                  <div className="clothes">
                    {post.clothing.map((item, index) => {
                      let emoji;
                      switch (item.type) {
                        case 'shirt':
                          emoji = '👕';
                          break;
                        case 'skirt':
                          emoji = '👗';
                          break;
                        case 'pants':
                          emoji = '👖';
                          break;
                        case 'shoes':
                          emoji = '👟';
                          break;
                        default:
                          emoji = '';
                      }
                      return (
                        <div key={index} className="clothing-item">
                          <span className="clothing-emoji">{emoji}</span>
                          <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                        </div>
                        
                      );
                    })}
                  </div>
                  <h2 className="motto">{post.motto}</h2>
                
                </div>
                <div className="post-right">

                <div className="post-photo">
                    <img src={post.photoUrl || "smallberg.jpeg"} alt="Post" />
                  </div>
                  <h2 className="username">{post.username}</h2>
                  <div className="emojis">
                    {post.emojis.map((emojiData, index) => (
                      <span key={index} onClick={() => handleEmojiClick(post.id, index)}>
                        {emojiData.emoji} {emojiData.count}
                      </span>

                    ))}
                  </div>

                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
      </div>
  );
 


};


export default Homepage;

