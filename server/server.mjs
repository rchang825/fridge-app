import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import items from "./routes/item.mjs";
import lists from "./routes/list.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/item", items);
app.use("/list", lists);

app.get('/' , (req, res) => {
  res.send('<h1>hi</h1>');
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});