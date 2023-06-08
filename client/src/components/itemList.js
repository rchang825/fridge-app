import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Item from "./item";

 
export default function ItemList() {
 const [items, setItems] = useState([]);
 
 //fetch list of items from the database.
 useEffect(() => {
   async function getItems() {
     const response = await fetch(`http://localhost:5050/item/`);
 
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
 }, [items.length]);
 
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
   <div>
     <h3>Item List</h3>
     <div class="grid-container">
        <h5 class="grid-item">Name</h5>
        <h5 class="grid-item">Quantity</h5>
        {/* <h5 class="grid-item">Action</h5> */}
     </div>
     <div>{itemList()}</div>
   </div>
 );
}