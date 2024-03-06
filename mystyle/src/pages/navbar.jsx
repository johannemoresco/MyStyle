import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './navbar.css';

//Emeveryone needs to do...
// //npm install react-dom
// import {Link} from 'react-router-dom';

// // for some reason when this is called its not being displayed anymore -- currently being worked on
// const NavBar = () => {
//   return (
//     <nav className="navigation">
//         <Link to="/homepage" className="app-name">MyStyle</Link>
//       <div className="nav-links">
//         <Link to="/upload">Upload</Link>
//         <Link to="/notifications">Notifications</Link>
//         <Link to="/search">Search</Link>
//         <Link to="/profile">Profile</Link>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

// restarting the navbar to support the links



export default function NavBar(){
 return <nav className="nav">
   <a href="/" className="MyStyle-Title">MyStyle
   </a>
   <ul>
   <li>
           <a href="/homepage">Home</a>
       </li>
       <li>
           <a href="/upload">Upload</a>
       </li>
       <li>
           <a href="/notifications">Notifications</a>
       </li>
       <li>
           <a href="/search">Search</a>
       </li>
       <li>
           <a href="/profile">Profile</a>
       </li>

   </ul>


 </nav>


}



function CustomLink({ to, children, ...props }) {
 const resolvedPath = useResolvedPath(to)
 const isActive = useMatch({ path: resolvedPath.pathname, end: true })


 return (
   <li className={isActive ? "active" : ""}>
     <Link to={to} {...props}>
       {children}
     </Link>
   </li>
 )
}

