const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const { response } = require('express');

app = express();

app.use(express.static("static"));

app.use(bodyParser.urlencoded(
  { extended: true }
));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us21.api.mailchimp.com/3.0/lists/9359f18b24",
    method: "POST",
    headers: {
      "Authorization":"Dhananjay 747074f1bfb0f6c1cb8b25f545af3aa8-us21"
    },
    body: jsonData
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname+"/failure.html");
    }
    else {
      if(response.statusCode!=200){
        res.sendFile(__dirname+"/failure.html");
      }else{
        res.sendFile(__dirname+"/success.html");
      }
    }
  });
});

app.post("/backToMain", function (req,res){
  res.redirect('/');
});

app.listen(3000, function () {
  console.log("Server started at port 3000");
});