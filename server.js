var express = require("express");
var app = express();
var moment = require("moment");
var path = require("path");
var port = Number(process.env.PORT) || 8080;


app.get("/", function(request, response){
    var file = path.join(__dirname, "index.html");
    response.sendFile(file, function(err){
        if(err){
            console.log(err);
            response.status(404).end();
        } else{
            console.log(file);
        }
    });
});

app.get("/:query", function(request, response){
    var date;
    if(/^\d{8,}$/.test(request.params.query)){
        date = moment(request.params.query, "X");
    } else{
        date = moment(request.params.query, "MMMM D, YYYY");
    } 
    if(date.isValid()){
        response.json({
            unix: date.format("X"),
            natural: date.format("MMMM D, YYYY")
        });
    } else {
        response.json({
            unix: null,
            natural: null
        });
    }
});
app.listen(port, function(){
    console.log("On port:" + port);
});


//http://stackoverflow.com/a/17089982: match 8 or more digits