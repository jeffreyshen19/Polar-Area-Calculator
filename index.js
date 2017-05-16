var integral = require('./integral.js');
var express = require("express");

var app = express();

app.use(express.static("./public"));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get("/", function(req, res){
  res.render("index");
});

app.listen(process.env.PORT || 3000);
console.log("Running the server on http://localhost:3000");
