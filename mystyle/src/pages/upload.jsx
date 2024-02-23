// Johanne 
// stuff to do next:
// want to make it so once they hit submit the page rerenders with the image they uploaded
// also save the stuff they write on the input boxes so that it can be used for the actual post 
// also make it prettier lol 
import './upload.css'
import React, {useState} from "react";

const Upload = () => {
    return(
        <div className='wrapper'>
            <link rel="stylesheet" href="upload.css"></link>

            <h1 className='header1'> what are you wearing today? </h1>

        <div className='uploadimage'>
        <input type="file" name="file"/>
        <button>Submit</button>
        </div>

        <div className='photo'>
            <img src="smallberg.jpeg" alt="A picture of David Smallberg." className="photo-img"/>
        </div>

        <div>
            <div className='clotheslinking'>
            <h2 className='header2'> where are your clothes from? </h2>
            <div className="emoji">👕 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            <div className="emoji">👖 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            <div className="emoji">👗 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            <div className="emoji">👟 <input className='input' placeholder="Link or Name of Brand"></input> </div>
            </div>
        </div>
        </div>
);
}

export default Upload
