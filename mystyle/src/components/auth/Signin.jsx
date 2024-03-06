import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth();
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            setLoggedIn(true)

        })
        .catch((error) => {
            alert("Invalid username or password");
            console.log(error);
        });
    };

    const forgotPassword = (e) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset instructions have been sent to your email.")
        })
    .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
    });
    }

    if(loggedIn) {
        navigate("/home")
    }
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
                    <a href = "#" onClick={forgotPassword}>Forgot Password?</a>
                </div>

                <button type="submit" class = "btn">Login</button>

                <div class = "register-link">
                    <p>Don't have an account? <Link to="/Signup">Register</Link></p>
                 </div>

                
            </form>
        </div>
    );
};

export default SignIn; 