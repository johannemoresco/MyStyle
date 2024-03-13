// Johanne 
// stuff to do next:
// save the stuff they write on the input boxes so that it can be used for the actual post 
// also make it prettier lol 
// also need to add nav bar at the top so save some space for that
// lastly when people press to submit their image, have it save and share to the public/to their friends
import "./upload.css"
import React, {useState} from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase"
import { v4 } from "uuid";
import NavBar from './navbar';
import { getAuth } from "firebase/auth";
import { addDoc, collection} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom"


//import allowing timestamp feature for the posts:
import { serverTimestamp } from 'firebase/firestore';
// need to "npm install date-fns" -- formats timestamps


const Upload = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [inputData, setInputData] = useState({
        shirt: '',
        pants: '',
        dress: '',
        shoes: '',
            })
    const navigate = useNavigate();
        

/* uploadImage: Handles grabbing the file that the user inputted and grabbing the download url that is generated
from uploading this image to the images folder in the Firebase storage.
TLDR: Uploads the image to the firebase storage and grabs the url so it can be rendered onto the page */
    const uploadImage = () => {
        if(image == null){
            alert("Image Not Uploaded");
            return;
        }
        const auth = getAuth()
        const imageRef = ref(storage, ('images/' + image.name + v4()));
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
            }).catch((error) => {
                console.error('Error with getting download URL or uploading image:', error);
            });
        const userImages = ref(storage, ("users/" + auth.currentUser.uid + "/" + image.name) + v4());
        uploadBytes(userImages, image).then((snapshot) => {
            console.log("Succesfully stored under user's images.")
        }).catch((error) => {
            console.error(error)
        })
        });
    };
    
    const uploadPost = () => {
        if(imageUrl === '') {
            alert("Image not uploaded.");
            return
        }
        const auth = getAuth()
        const uid = auth.currentUser.uid;
        addDoc(collection(db, "users", uid, "posts" ), {
            imageURL: imageUrl,
            clothesData: inputData,
            // initialized likes as 0 when user uploads a new post
            likes:0,
            dislikes:0,
            createdAt: serverTimestamp() // Add this line to include a timestamp
        }).then((docRef) => {
            navigate("/home")
            console.log("Post added in firestore:", docRef.id);

        }).catch((error) => {
            console.error("Error adding doc: ", error)
        });
    };
    return (
        <div className="wrapper">
        <NavBar/>
        
        
        <div className='wrapper-upload'>
            
            <link rel="stylesheet" href="./upload.css"></link>

            <h1 className='what-are-you-wearing'> What are you wearing today? 👀 </h1>

            <div className='uploadimage'>
                <button onClick={uploadImage} className="image-view">Upload Image</button>
                <input
                type="file"
                name="file"
                accept=".jpg,.jpeg"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if(file && file.type === 'image/jpeg') {
                        setImage(file);
                    }
                    else {
                        alert("Please upload a valid file type. Accepted files: .jpg, .jpeg");
                    }
                }}
                />
            </div>

           
                
            

            <div className='photo-outfit'>
                <img src={imageUrl} alt="Today's outfit." className='photo-img'/>
            </div>
            <div>
                <div className='clotheslinking'>
                <h2 className='clothes-from'> Where are your clothes from? 🛍 </h2>
                <h2 className="fits">👕</h2>
                <h2 className="fits">👖</h2>
                <h2 className="fits">👗</h2>
                <h2 className="fits">👟</h2>

                    <div className="emoji-clothes" >
                        <input 
                        className='input-clothes' 
                        placeholder="Name of Brand"
                        value = {inputData.shirt}
                    onChange={(e) => setInputData({...inputData, shirt: e.target.value})}
                    ></input>
                    </div>
                    
                    <div className="emoji-clothes">
                    <input
                    className='input-clothes'
                    placeholder="Name of Brand"
                    value = {inputData.pants}
                onChange={(e) => setInputData({...inputData, pants: e.target.value})}
                    ></input> 
                    </div>
                    <div className="emoji-clothes">
                    <input
                    className='input-clothes'
                    placeholder="Name of Brand"
                    value = {inputData.dress}
                onChange={(e) => setInputData({...inputData, dress: e.target.value})}
                    ></input> 
                    </div>
                <div className="emoji-clothes">
                    <input 
                        className='input-clothes' 
                        placeholder="Name of Brand"
                        value = {inputData.shoes}
                        onChange={(e) => setInputData({...inputData, shoes: e.target.value})} 
                    ></input> 
                </div>
                </div>
                
            </div>
            <div className = "button-to-upload">
                <button onClick= {uploadPost} className='uploadfit'>Share my outfit!</button>
            </div>
            
            </div>
        </div>
);
}
export default Upload
