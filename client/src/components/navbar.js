import React from "react";
import "bootstrap/dist/css/bootstrap.css";
 
export default function Navbar() {
 return (
   <div>
     <nav className="align-nav navbar">
        <a className="navbar-brand" href="/">
            Fridge Contents
        </a>
        {/* <div id="navbarNav"> */}
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link no-link-style" href="/new">
                        Start New List
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link no-link-style" href="/create">
                        Add New Item
                    </a>
                </li>
            </ul>
        {/* </div> */}
     </nav>
   </div>
 );
}