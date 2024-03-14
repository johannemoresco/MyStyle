import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './navbar.css';


export default function NavBar(){
 return <nav className="nav">
   <a href="/home" className="MyStyle-Title">MyStyle
   </a>
   <ul>
   <li>
           <a href="/home">HOME</a>
       </li>
       <li>
           <a href="/upload">UPLOAD</a>
       </li>
       <li>
           <a href="/search">SEARCH</a>
       </li>
       <li>
           <a href="/profile">PROFILE</a>
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

