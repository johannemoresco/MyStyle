// Johanne 
// stuff to do next:
// save the stuff they write on the input boxes so that it can be used for the actual post 
// also make it prettier lol 
// also need to add nav bar at the top so save some space for that
// lastly when people press to submit their image, have it save and share to the public/to their friends
import './upload.css'
import React, {useEffect, useState} from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase"
import { v4 } from "uuid";

const Upload = () => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const uploadImage = () => {
        if(image == null){
            alert("Image Not Uploaded");
            return;
        }

        const imageRef = ref(storage, ('posts/' + image.name + v4()));
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrl(url);
            }).catch((error) => {
                console.error('Error with getting download URL or uploading image:', error);
            });
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
            <img src={imageUrl} className='photo-img'/>
        </div>

        <div>
            <div className='clotheslinking'>
            <h2 className='header2'> where are your clothes from? 🛍 </h2>
            <div className="emoji">👕 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            <div className="emoji">👖 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            <div className="emoji">👗 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            <div className="emoji">👟 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            </div>
        </div>
        <button className='uploadfit'>Share my outfit!</button>
        </div>
);
}

export default Upload
