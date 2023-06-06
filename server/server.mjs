import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import items from "./routes/item.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/item", items);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});