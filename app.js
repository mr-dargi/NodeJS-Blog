const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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
app.get("/blogs", (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("main", { title: "All blogs", blogs: result })
        })
        .catch((err) => console.log(err));    
})

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => res.redirect("/blogs"))
        .catch((err) => console.log(err));
})


app.get("/blogs/:id", (req, res) => {
    const id = req.params.id; // The name of id is same just like /:id
    Blog.findById(id)
        .then((result) => res.render("details", { blog: result, title: "Blog details" }))
        .catch((err) => console.log(err));
})


app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "CREATE NEW BLOG" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})