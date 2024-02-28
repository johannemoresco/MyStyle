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
                <h1> Start sharing your outfits! </h1>
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email} 
                         onChange={(e) => setEmail(e.target.value)}
                         required 
                    />
                    <i class = 'bx bxs-user'></i>
                  
 
                </div> 

                <div className="input-box">
                    <input
                        type="password" 
                        placeholder="Enter your password" 
                        value={password} 
                         onChange={(e) => setPassword(e.target.value)}
                         required 
                    />

                </div>

                <div className="remember-forgot">
                    <label><input type = "checkbox"/> Remember me</label>
                    <a href = "#">Forgot Password</a>
                </div>

                <button type="submit" class = "btn">Login</button>

                <div class = "register-link">
                    <p>Don't have an account? <a href = "#">Register</a></p>
                 </div>

                
            </form>
        </div>
    );
};

export default SignIn; 