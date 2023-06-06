import React from "react";
 
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// // We import NavLink to utilize the react router.
// import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav class="align-nav navbar">
        <a class="navbar-brand" href="/">
            Fridge Contents
        </a>
        <div class="no-flex-grow" id="navbarNav">
            <ul class="navbar-nav nav">
                <li class="nav-item">
                    <a class="nav-link" href="/create">
                        Add New Item
                    </a>
                </li>
            </ul>
        </div>
     </nav>
   </div>
 );
}