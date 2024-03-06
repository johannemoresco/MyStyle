// Johanne 
// stuff to do next:
// save the stuff they write on the input boxes so that it can be used for the actual post 
// also make it prettier lol 
// also need to add nav bar at the top so save some space for that
// lastly when people press to submit their image, have it save and share to the public/to their friends
import './upload.css'
import React, {useState} from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, database } from "../firebase"
import { v4 } from "uuid";

// assume we are going to click upload with a user's information already 
// have to link every thing to the user bc we have to make the user be able to look thru all of their old posts 
// it should just be the image tbh bc saving the info on where the clothes are from is a lottt more work im already having trouble linking 
// the image and the text together </3 

// get user id 
// for every image, save that under user_images, which will be a subcollection 
const Upload = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [inputData, setInputData] = useState({
        shirt: '',
        pants: '',
        dress: '',
        shoes: '',
            })
    const [postUrl, setPostUrl] = useState('');

/* uploadImage: Handles grabbing the file that the user inputted and grabbing the download url that is generated
from uploading this image to the images folder in the Firebase storage.
TLDR: Uploads the image to the firebase storage and grabs the url so it can be rendered onto the page */
    const uploadImage = () => {
        if(image == null){
            alert("Image Not Uploaded");
            return;
        }

        // change this later to be the user's images 
        const imageRef = ref(storage, ('images/' + image.name + v4() + ".html"));
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
                // save the url of the image to firebase database so it is accessible for the home page
                // database.ref('users/' + user.uid).update({imageUrl: url});
            }).catch((error) => {
                console.error('Error with getting download URL or uploading image:', error);
            });
        });
    };  

    // const uploadText = () => {
    //     if (inputData.shirt == '' && inputData.pants == '' && inputData.dress == '' && inputData.shoes == ''){
    //         return;
    //         // no data to save so dont save it 
    //     }
    //     const inputRef = ref(storage, ('data/' + imageUrl));
    //     uploadBytes(inputRef, inputData).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             setInputUrl(url);
    //         }).catch((error) => {
    //             console.error('Error getting input URL, or inputs are empty:', error);
    //         });

    //     });
    // };
/* uploadPost: gets the image url and the data from the input boxes and saves it as a post 
this is so that it can be accessed through the homepage when user posts 
*/
    const uploadPost = () => {
        if (imageUrl === '') {
            alert("Image not uploaded");
            return;
        }
        // change this later to be the user's id and posts subcollection later  
        const postDataRef = ref(storage, 'posts/' + Date() + v4());
        // this needs work -- unsure how to test unless i actually have a home page to test it with
        // have a variable for the user with their latest shared post being set to this url ??
        // so that it can be easily accessed later when we are trying to access the homepage ??
        // ex: mostRecentPost = this_post_url 
        // so that home page can just grab that 
        // but maybe troublesome if user shares more than one post a day 
        // can set a limit for one post a day 
        uploadBytes(postDataRef).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setPostUrl(url)
            })
            const postID = snapshot.ref.name.split('.')[0];
            database.ref('posts/' + postID).set({
                imgUrl: imageUrl,
                clothesDetail: inputData
            
            });
        }).catch((error) => {
            console.error('Error uploading post data:', error);
        });
    };
 
    return(
        <div className='wrapper'>
            <link rel="stylesheet" href="upload.css"></link>

            <h1 className='header1'> what are you wearing today? 👀 </h1>

            <div className='uploadimage'>
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
            <button onClick={uploadImage}>Submit</button>
            </div>

            <div className='photo'>
                <img src={imageUrl} alt="Today's outfit." className='photo-img'/>
            </div>

            <div>
                <div className='clotheslinking'>
                <h2 className='header2'> where are your clothes from? 🛍 </h2>
                <div className="emoji">
                    👕 <input 
                    className='input' 
                    placeholder="Link or Name of Brand"
                    value = {inputData.shirt}
                    onChange={(e) => setInputData({...inputData, shirt: e.target.value})}

                    ></input> </div>
                <div className="emoji">
                    👖 <input
                     className='input'
                      placeholder="Link or Name of Brand"
                      value = {inputData.pants}
                    onChange={(e) => setInputData({...inputData, pants: e.target.value})}
                      
                      ></input> </div>
                <div className="emoji">
                    👗 <input
                     className='input'
                      placeholder="Link or Name of Brand"
                      value = {inputData.dress}
                    onChange={(e) => setInputData({...inputData, dress: e.target.value})}
                      ></input> </div>
                <div className="emoji">
                    👟 <input 
                    className='input' 
                    placeholder="Link or Name of Brand"
                    value = {inputData.shoes}
                    onChange={(e) => setInputData({...inputData, shoes: e.target.value})}
                    
                    ></input> </div>
                </div>
            </div>
            <button onClick= {uploadPost} className='uploadfit'>Share my outfit!</button>
        </div>
);
}
export default Upload
