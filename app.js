const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require("./routers/blogRouters");

mongoose.set("strictQuery", false);

// express app
const app = express();

// conect to mongodb 
const username = encodeURIComponent("");
const password = encodeURIComponent("");
const dbURI = `mongodb+srv://${username}:${password}@cluster0.9pimv74.mongodb.net/nodeBlog?retryWrites=true&w=majority`;



mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));



// register view engine
app.set("view engine", "ejs");


// middleware and & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.get("/", (req, res) => {
    res.redirect("./blogs");
});


app.get("/about", (req, res) => {
    res.render("about", { title: "ABOUT" });
});


// blog routes
app.use("/blogs", blogRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})