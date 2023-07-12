import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Item from "./item";


 
export default function ItemList({ listId }) {
 const [items, setItems] = useState([]);
 
 //fetch list of items from the database.
 useEffect(() => {
   async function getItems() {
     const response = await fetch(`http://localhost:5050/list/${listId}/items`);
 
     if (!response.ok) {
       const message = `Error: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const items = await response.json();
     setItems(items);
   }
 
   getItems();
 
   return;
 }, [items.length, listId]);
 
 //delete item using id
 async function deleteItem(id) {
   await fetch(`http://localhost:5050/item/${id}`, {
     method: "DELETE"
   });
 
   const newItems = items.filter((el) => el._id !== id);
   setItems(newItems);
 }
 
 // create list with all database documents
 function itemList() {
   return items.map((item) => {
     return (
       <Item
         item={item}
         deleteItem={() => deleteItem(item._id)}
         key={item._id}
       />
     );
   });
 }
 
 // return created list, styled in a table
 return (
   <div id="item-list">
    <p className="align-component">Make sure to save the current link or list ID to reaccess this page later! <br></br>
    Your list ID is <strong>{listId}</strong> <br></br></p>

     <h3>Item List</h3>
     <div className="grid-container">
        <h5 className="grid-item">Name</h5>
        <h5 className="grid-item">Quantity</h5>
     </div>
     <div>{itemList()}</div>
   </div>
 );
}