import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { createList } from "../apis/list";
import { useNavigate } from "react-router-dom";

export default function Navbar({ listId }) {
    const navigate = useNavigate();
    const clickHandler = async () => {
        //call list API to create new list
        const response = await createList();
        //get id of new list
        const listId = response.insertedId;
        //redirect to new list page
        navigate(`/list/${listId}`);
    };
    
 return (
   <div>
     <nav className="align-nav navbar">
        <a className="navbar-brand" href="/">
            Fridge Contents
        </a>
        {/* <div id="navbarNav"> */}
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <span onClick={clickHandler}>
                        Start New List
                    </span>
                </li>
                <li className="nav-item">
                    <a className="nav-link no-link-style" href={`/list/${listId}/create`}>
                        Add New Item
                    </a>
                </li>
            </ul>
        {/* </div> */}
     </nav>
   </div>
 );
}