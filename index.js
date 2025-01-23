const express = require("express");
require('dotenv').config();
const port = process.env.PORT;
const http = require("http");
const connection = require("./db");
const cors = require("cors");
connection();
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/user",require("./routes/user/profile"));
app.use("/api/role",require("./routes/role/index"));
app.use("/api/assign",require("./routes/assign"));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});