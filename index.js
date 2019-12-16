const express = require('express')
const mongodb = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./html_data'))


app.get('/customerdata',(req,res)=>{
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("HastePickupService");
dbo.collection('customer').find({}).toArray(function(err, result)
{
if (err) throw err;
// write HTML output
          var output = '<html><header><title>Display Collection</title></header><body>';
          output += '<table border="1"><tr><td><b>' + 'Username' + '</b></td><td><b>' + 'FirstName' + '</b></td><td><b>'
 + 'LastName' + '</b></td><td><b>' + 'Registration_ID' + '</b></td></tr>'+'</b></td><td><b>' + 'Address' + '</b></td></tr>';
 
            result.forEach(function(results){
            output += '<tr><td>' + results.username + '</td><td>' + results.firstName +  '</td><td>' + results.lastName
+'</td><td>' + results.RegistrationId +'</td></tr>'+'</td><td>' + results.Address +'</td></tr>';
          });

          // write HTML output (ending)
          output += '</table></body></html>'

          // send output back
 res.send(output);
db.close();
});
});
});

app.get('/customerdata/:username',(req,res)=>{
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("HastePickupService");
dbo.collection('customer').find({"UserName":(req.params.username)}).toArray(function(err, result)
{
if (err) throw err;
res.send(result);
db.close();
});
});
});

//CODE TO INSERT INTO COLLECTION
app.post('/customer',(req,res)=>{
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("HastePickupService");
var doc = { 'username':req.body.cname,
        'firstName':req.body.fname,
        'lastName':req.body.lname,
'RegistrationId':req.body.rid,
        'Address':req.body.addr};
dbo.collection('customer').insertOne(doc,function(err, result)
{
if (err) throw err
res.send("Data is inserted to Table");
db.close();
});
});
});

// code to update document from collecttion
app.post('/updatecustomer',(req,res) => {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
console.log("welcome yo update");

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("HastePickupService");
var query = {'RegistrationId':req.body.rid};
var newquery = { $set: { 'customer_username': req.body.cname ,'firstName':req.body.fname,'lastname':req.body.lname,'address':req.body.addr } };
dbo.collection('customer').updateOne(query,newquery,function(err, result)
{
if (err) throw err;
res.send('COLLECTION  UPDATED');
db.close();
});
});

});

// code to delete document from collection
app.post('/delete_data',(req,res) => {
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db)
{
if (err) throw err;
var dbo = db.db("HastePickupService");
var query = { 'RegistrationId': req.body.rid };
dbo.collection('customer').deleteOne(query,function(err, result)
{
if (err) throw err;
res.send('ONE DOCUMENT DELETED');
db.close();
});
});
});
 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ${port}..'));




