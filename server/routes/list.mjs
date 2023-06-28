import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you create a new list.
router.post("/", async (req, res) => {
    let newDocument = {
        item_ids: []
      };
    let collection = await db.collection("lists");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  });
router.get("/:listId/items", async (req, res) => {
    const listId = req.params.listId;
    let collection = await db.collection("items");

    let results = await collection.find({listId: listId}).toArray();
    res.send(results).status(200);
});

export default router;