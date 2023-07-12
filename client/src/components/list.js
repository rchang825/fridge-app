import React from "react";
import { useParams } from "react-router-dom";
import ItemList from "./itemList";
import Navbar from "./navbar";

export default function List() {
    let { listId } = useParams();

    return <div>
        <Navbar listId={listId} />
            <ItemList listId={listId}/>
        </div>;
}