import React from "react";
import { createList } from "../apis/list";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

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
     <nav className="align-nav nav">
        <a className="no-link-style nav-brand" href="/">
            Fridge Contents
        </a>
        <div id="">
            <ul className="justify-content-end nav-ul">
                 <li className="nav-li-item">
                    <p className="clickable" onClick={clickHandler}> 
                        New List
                    </p>                        

                </li>
                {listId ?
                    <li className="nav-li-item">
                        <a className="no-link-style" href={`/list/${listId}/create`}>
                            Add New Item
                        </a>
                    </li> 
                    : null   }                 
            </ul>
        </div>
     </nav>
   </div>
 );
}