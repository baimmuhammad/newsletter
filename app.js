const express = require("express");
const request = require("request");
const https =require("https");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
const firstName = req.body.fname;
const lastName = req.body.lname;
const email = req.body.email;

//console.log(firstName, lastName, email);
const data = {
    members: [
        {
        email_addres: email,
        status: "subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME: lastName
        }

    }
]
};

const jsonData= JSON.stringify(data);
const url = "https://us5.api.mailchimp.com/3.0/lists/81b9f7d5ce";
const options = {
    method: "POST",
    auth:"baim1:d52cfbfe0c8bf20b66a07cc383eb6b33-us5"
}


const request = https.request(url, options, function(response){
response.on("data", function(data)
{
    console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();
});



app.listen(3000, function() {
    console.log("Server is Running in port 3000");
});

// api key
// d52cfbfe0c8bf20b66a07cc383eb6b33-us5
// list api
// 81b9f7d5ce