const express = require("express");
const app = express();
require("./models/dbConfig");
const postRoutes = require("./routes/PostController");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use("/posts", postRoutes);
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(5500, () => console.log("serveur started: 5500"));
