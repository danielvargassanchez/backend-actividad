const express = require("express");
const app = express();
const routes = require("./routes/index");
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(routes.data);
app.listen(4000);
console.log("server ready listen port 4000");
