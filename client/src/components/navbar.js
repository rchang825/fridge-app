import React from "react";
import "bootstrap/dist/css/bootstrap.css";
 
export default function Navbar() {
 return (
   <div>
     <nav class="align-nav navbar">
        <a class="navbar-brand" href="/">
            Fridge Contents
        </a>
        <div id="navbarNav">
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