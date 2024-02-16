import React, {useState} from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    return(
        <div className="sign-up-container">
            <form onSubmit={signUp}>
                <h1> No account? Create one!</h1>
                <h2> Please enter a valid email address. 
                    Passwords must be at least 6 characters long.
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

                <div className="input-box">
                    <input
                        type="password" 
                        placeholder="Enter a password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />              
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};


export default SignUp; 