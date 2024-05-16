let http = require("http");

let nStatic = require("node-static");

let fileServer = new nStatic.Server("./public");

http
    .createServer(function (req, res) {
        fileServer.serve(req, res);
    })
    .listen(5000);

console.log("Running app on port 5000; url=localhost:5000");