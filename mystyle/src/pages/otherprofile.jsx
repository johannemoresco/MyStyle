// BEING DONE BY SYDNEY

// other user's profile, not their own

/* 

   can only see other people's top three posts
   if you follow them or not
   their profile picture
   NO BIO
   prof pic + 3 top fits ONLY + username

*/

import './otherprofile.css'

const Otherprofile = () => {

    function profile_photo() {
        return //image of thing
    }

    function profile_name() {
        return "Your name";
    }

    function yourFriends(user) {
        return user.friends.amount + " Friends";
    }

    function yourPost() {
        return //photo
    }

    function setTopThree() {
        return // top three set
    }

    function unSetTopThree() {
        return // take one away from being top three
    }

    function displayFits() {
        return // all the fits ever taken
    }
    

    return (
        
        <div className='wrapper'>
            <link rel="stylesheet" href="userprofile.css"></link>

            <div className="profile-header">
                <img src="smallberg.jpeg" alt="pfp" />
                <div className="profile-info">
                    <div className="header1"> Someone else's Sexy Closet </div>
                </div>
            </div>
            <hr />
            <div className="profile-top-three">
                {/*top three images*/}
                <img src="smallberg.jpeg" alt="pfp" />
                <img src="smallberg.jpeg" alt="pfp" />
                <img src="smallberg.jpeg" alt="pfp" />
            </div>
            

        </div>

    );

}


/*

    ACCESSABLE BY: clicking on someone's profile
    https://docs.google.com/presentation/d/1zHLfMZQK-1YZTEmax9DEc4kZKvH03G0Nm6-o5POn9nE/edit#slide=id.g2947b929940_0_298

*/


export default Otherprofile