import { useEffect, useState } from "react";

const Item = (props) => {
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [quantityEditing, setQuantityEditing] = useState(false);
    const [nameEditing, setNameEditing] = useState(false);
  
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
    return (<div className="grid-container">
     <p className="grid-item">
        {nameEditing ?
        <input value={itemName} autoFocus onChange={e => setItemName(e.target.value)} onBlur={handleNameBlur} /> :
        <span onClick={handleNameFocus}>{itemName}</span>}
      </p>
     <p className="grid-item">
        <input type="button" id="decrement" value="-" onMouseDown={handleDec}/>
        {quantityEditing ? 
        <input value={itemQuantity} autoFocus onChange={e => setItemQuantity(e.target.value)} onBlur={handleQuantityBlur} /> : 
        <span className="quantity" onClick={handleQuantityFocus}>{itemQuantity}</span>}
        <input type="button" id="increment" value="+" onMouseDown={handleInc}/>
    </p>    
     <p className="grid-item">
       <button className="btn"
         onClick={() => {
           props.deleteItem(props.item._id);
         }}
       >
         Delete
       </button>
     </p>
   </div>
  )};

  export default Item;