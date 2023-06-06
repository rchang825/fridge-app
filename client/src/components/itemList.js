import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ContentEditable from 'react-contenteditable'

const Item = (props) => {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [quantityEditing, setQuantityEditing] = useState(false);
  const [nameEditing, setNameEditing] = useState(false);


  //get both name and quantity regardless of what was actually changed
  // function getNewDetails() {
  //   // const newName = name.current;
  //   //const newQuantity = quantity.current;
  //   console.log("getting name: ", itemName);
  //   console.log("getting quantity: ", itemQuantity);

  //   updateDetails(itemName, itemQuantity);
  // }
  //create a new object containing the data to be updated
  async function updateDetails(newName, newQuantity) {
    const editedItem = {
      name: newName,
      quantity: newQuantity
    };
  
    //send data to be updated in the database
    await fetch(`http://localhost:5050/item/${props.item._id}`, {
      method: "PATCH",
      body: JSON.stringify(editedItem),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
  //get and save new name/quantity
  // const name = useRef('');
  // const quantity = useRef('');

  // const handleNameChange = e => {
  //     name.current = e.target.value;
  //     console.log("changed! ", name.current);
  // };
  // const handleQuantityChange = e => {
  //     quantity.current = e.target.value;
  //     //console.log("changed! ", quantity.current);
  // };

  //when user clicks off, save to database, switch back to text field  
  function handleNameBlur () {
    updateDetails(itemName, itemQuantity);
    setNameEditing(false);
  }
  function handleNameFocus () {
    setNameEditing(true);
  }
  function handleQuantityBlur () {
    updateDetails(itemName, itemQuantity);
    setQuantityEditing(false);
  };
  function handleQuantityFocus () {
    setQuantityEditing(true);
  }

  useEffect(() => {
    console.log("props: ", props);
    // name.current = props.item.name;
    // quantity.current = props.item.quantity;
    // console.log("Set name.current to be: ", name.current);
    // console.log("Set quantity.current to: ", quantity.current);
    setItemName(props.item.name);
    setItemQuantity(props.item.quantity);
    
  }, []);

  function handleDec() {
    const newQuantity = Number(itemQuantity) - 1;
    if (newQuantity <= 0) {
      props.deleteItem(props.item._id);
    }
    setItemQuantity(newQuantity);
    console.log("quantity decremented! now: ", newQuantity);
    updateDetails(itemName, newQuantity);
  };
  function handleInc() {
    const newQuantity = Number(itemQuantity) + 1;
    setItemQuantity(newQuantity);
    console.log("quantity incremented! now: ", newQuantity);
    updateDetails(itemName, newQuantity);
  };

  //return item with editable name and quantity
  return (<div class="data">
   <p class="name-data">
      {nameEditing ?
      <input value={itemName} autoFocus onChange={e => setItemName(e.target.value)} onBlur={handleNameBlur} /> :
      <span onClick={handleNameFocus}>{itemName}</span>}
    </p>
   <p class="quantity-data">
    <div class="managed-numbers">
      <input type="button" id="decrement" value="-" onMouseDown={handleDec}/>
      {quantityEditing ? 
      <input value={itemQuantity} autoFocus onChange={e => setItemQuantity(e.target.value)} onBlur={handleQuantityBlur} /> : 
      <span onClick={handleQuantityFocus}>{itemQuantity}</span>}
    <input type="button" id="increment" value="+" onMouseDown={handleInc}/>
    </div>
  </p>    
   <p>
     {/* <Link className="btn btn-link" to={`/edit/${props.item._id}`}>Edit</Link> | */}
     <button className="btn btn-link"
       onClick={() => {
         props.deleteItem(props.item._id);
       }}
     >
       Delete
     </button>
   </p>
 </div>
)};
 
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
     <div>
       <div class="headers">
           <h5>Name</h5>
           <h5>Quantity</h5>
           <h5>Action</h5>
       </div>
       <div>{itemList()}</div>
     </div>
   </div>
 );
}