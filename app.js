const express = require("express");

// express app
const app = express();

// register view engine
app.set("view engine", "ejs");


// listen for request
app.listen(3000);

app.get("/", (req, res) => {
    const blogs = [
        {title: "Some time see you past out side my door", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."},
        {title: "Mohammad reza Dargi", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."},
        {title: "How to defeat browser", snippet: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."}
    ]
   res.render("main", { title: "HOME", blogs });
});


app.get("/about", (req, res) => {
    res.render("about", { title: "ABOUT" });
 });


app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "CREATE NEW BLOG" });
});

// 404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
})