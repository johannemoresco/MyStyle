import React, {useRef,useState} from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import './Signup'; 
//import {useRef, useState} from "react";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    // const [FirstName, setFirstName] = useState('');
    // const [LastName, setLastName] = useState('');

    const auth = getAuth();
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password, username)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    function Images() {
        return (
            <>
                <div className="image">
                    <input type="file" name="file" onChange={handleImage} />
                </div>
                <div className="pfp">
                    <button type="submit">Save Photo</button>
                </div>
            </>
        );
    }

    const [image, setImage] = useState('')
        function handleImage(e) 
        {
            console.log(e.target.files)
            setImage(e.target.files[0])
        }
    return(

        <div className="sign-up-container">

            <link rel="stylesheet" href = "SignUp.css"></link>
            <Images/>
             
            <form onSubmit={signUp}>

                   
 
                <h1> Create an account!</h1>
                <h2> Enter a valid email address. 
                    
                </h2>
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <h2>Password must be a minimum 6 of characters.</h2>
                <div className="input-box">
                    <input
                        type="password" 
                        placeholder="Enter a password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />              
                </div>

                <h2>Username must not contain special characters. </h2>
                {/* <em>Ex: "* , - , : , ; , ' , ! , = , + , / , ` , ~ "</em> */}
                <div className="input-box">
                    <input
                        type = "username"
                        placeholder="Username"
                        value= {username}
                        onChange={(e) => setUsername(e.target)}
                        required
                    />
                </div>

                {/* <h2>First name</h2>
                <div className="input-box">
                    <input
                        type="input-box"
                        placeholder="First Name"
                        value= {FirstName}
                        onChange={(e) => setFirstName(e.target)}
                        required
                    />
                </div> */}

                {/* <h2>Last name</h2>
                <div className="input-box">
                    <input
                        type="input-box"
                        placeholder="Last Name"
                        value= {LastName}
                        onChange={(e) => setLastName(e.target)}
                        required
                    />
                </div> */}

                <button type="submit" class = "btn">Sign Up</button>

                <div class = "login-link">
                    <p>Already have an account? <a href = "#">Login</a></p>
                </div>

            </form>
        </div>
    );
};


export default SignUp; 