let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});
app.route("/name").get(function(req, res) {
    res.json({name: `${req.query["first"]} ${req.query["last"]}`})
}).post(function(req, res) {
    res.json({name: `${req.body["first"]} ${req.body["last"]}`});
});
app.get("/:word/echo", function(req, res) {
    res.json({echo: req.params.word});
});
app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    console.log(req.time);
    next();
}, function(req, res) {
    res.json({time: req.time});
});
app.use("/public", express.static(__dirname + "/public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
    const obj = {
        "message": "Hello json"
    }
    if (process.env.MESSAGE_STYLE === "uppercase") {
        obj.message = obj.message.toUpperCase();
        res.json(obj);
    }
    else {
        res.json(obj);
    }
});





























 module.exports = app;
