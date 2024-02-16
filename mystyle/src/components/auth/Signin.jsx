import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            alert("Invalid username or password");
            console.log(error);
        });
    };
    return(
        <div className="sign-in-container">
            <form onSubmit={signIn}>
                <h1> Log in to start sharing your outfits. </h1>
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    {/* Icon if needed */}
                </div>

                <div className="input-box">
                    <input
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    {/* Icon if needed */}
                </div>

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default SignIn; 