import express from "express";
import routes from "./routes/index.js";
import "./config/mongoose.js";

const port = 5000;
const app = express();

// parse JSON data in request object
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log("Server started on port : ", port);
});
