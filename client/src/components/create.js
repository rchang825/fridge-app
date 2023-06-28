import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export default function Create() {
  let { listId } = useParams();
 const [form, setForm] = useState({
   listId: listId,
   name: "",
   quantity: 0
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new item to the database.
   const newItem = { ...form };
 
   await fetch("http://localhost:5050/item", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newItem),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm((prev) => {
      return ({ name: "", quantity: 0, listId: prev.listId});
    });
   navigate(`/list/${listId}`);
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add New Item</h3>
     <form className="new-item-form" onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           required
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="quantity">Quantity</label>
         <input
           type="number"
           className="form-control"
           id="quantity"
           value={form.quantity}
           placeholder="Amount of item"
           min="0"
           step="0.25"
           required
           onChange={(e) => updateForm({ quantity: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Add item"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}