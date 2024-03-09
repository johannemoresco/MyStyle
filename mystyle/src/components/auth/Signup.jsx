import React, {useState} from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, query, getDocs, where, collectionGroup, getFirestore } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "../../pages/SignUp.css";



const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const auth = getAuth();
    const database = getFirestore();
    const signUp = async (e) => {
        e.preventDefault();

        const validUsername = await checkUsername(username);
        if (!validUsername) {
            alert("Username is not available or contains special characters");
            return;
        }

        const validEmail = await checkEmail(email);
        {
            if(!validEmail) {
                alert("An account is already associated with that email")
                return;
            }
        }
        // stores userdata in the cloud firestore as a collection 
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(collection(db, "users/" + user.uid + "/userData"), {
            uid: user.uid,
            email: user.email,
            username: username
        });
        alert("Account successfully created! Please log in.")
    };
    async function checkEmail(email) {
        // check to make sure email is not already in the database
        const emailQuery = query(collectionGroup(database, "userData"), where("email", "==", email));
        const querySnapshot = await getDocs(emailQuery);
        if(querySnapshot.size > 0) {
            return false;
        }
        else{
            return true; 
        }

    }

    async function checkUsername(username) {
        // check to make sure username doesnt have special characters using a regex 
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharacters.test(username)) {
            console.log("Username has special characters.")
            return false
        }

        // check to make sure username is not already in the database 
        const usernameQuery = query(collectionGroup(database, "userData"), where("username", "==", username));
        const querySnapshot = await getDocs(usernameQuery);
        if(querySnapshot.size > 0) {
            return false;
        }
        else{
            return true; 
        }

}
    return(
        <div className="sign-up-container">

            <link rel="stylesheet" href = "SignUp.css"></link>

             
            <form onSubmit={signUp}>

                   
 
                <h1> Create an account!</h1>
                <h2> Enter a valid email address. 
                    
                </h2>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Enter your email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>

                <h2>Password must be a minimum 6 of characters.</h2>
                <div className="input-box">
                    <input
                        type="text" 
                        placeholder="Enter a password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />              
                </div>

                <h2>Username must not contain special characters. </h2>
                <div className="input-box">
                    <input
                        type = "text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
            
                <button type="submit" class = "btn">Sign Up</button>

                <div class = "login-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>

            </form>
        </div>
    );
};


export default SignUp; 