const express = require("express");

// express app
const app = express();

// listen for request
app.listen(3000);

app.get("/", (req, res) => {
   // res.send("<p>Home page</p>");
   res.sendFile("./views/main.html", { root : __dirname });
});


app.get("/about", (req, res) => {
    // res.send("<p>About page</p>");
    res.sendFile("./views/about.html", { root : __dirname });
 });