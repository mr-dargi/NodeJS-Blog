const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // set header content type
    res.setHeader("Content-Type", "text/html");

    let path = "./views/";

    switch(req.url) {
        case "/":
            path+= "main.html";
            break;
        case "/about":
            path+= "about.html"
            break;
        default:
            path+= "404.html"        
    }

    fs.readFile(path, (err, data) => {
        if(err) {
                console.log(err);
                res.end;
        }else {
            // res.write(data);
            res.end(data);
        }
    });
})

server.listen(3000, "localhost", () => {
    console.log("listining on port 3000");
})