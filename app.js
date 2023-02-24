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
app.use(morgan("dev"));


// mongoose and mongo sendbox routes
// app.get('/add-blog', (req, res) => {
// const blog = new Blog({
//         title: 'new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     })

//     blog.save()
//         .then(result => {
//         res.send(result);
//         })
//         .catch(err => {
//         console.log(err);
//         });
// });


// app.get("/all-blogs", (req, res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })


// app.get("/single-blog", (req, res) => {
//     Blog.findById()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })


app.get("/", (req, res) => {
//     const blogs = [
//         {title: "Some time see you past out side my door", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."},
//         {title: "Mohammad reza Dargi", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."},
//         {title: "How to defeat browser", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."}
//     ]
//    res.render("main", { title: "HOME", blogs });
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


app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "CREATE NEW BLOG" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})