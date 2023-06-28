import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Home from "./components/home";
import Navbar from "./components/navbar";
import ItemList from "./components/itemList";
import Create from "./components/create";
import List from "./components/list";

const App = () => {
return (
  <div>
    
    <Routes>
      <Route exact path="/" element={<Home />} />
      {/* <Route path="/edit/:id" element={<Edit />} /> */}
      <Route path="/list/:listId" element={<List />} />
      <Route path="/list/:listId/create" element={<Create />} />
      
    </Routes>
  </div>
);
};

export default App;