var MongoClient = require ('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useUnifiedTopology: true}, function ( err, db){
	if (err) throw err;
	var mydbs = db.db("HastePickupService");
	
	var mydata =[{username:"shahrukh", firstName:"01234", lastName:"srk@icloud.com", RegistrationId:"0987", Address:"6478596541"},
	{username:"shahrukh", firstName:"01234", lastName:"srk@icloud.com", RegistrationId:"0987", Address:"6478596541"},
	{username:"shahrukh", firstName:"01234", lastName:"srk@icloud.com", RegistrationId:"0987", Address:"6478596541"},
	{username:"shahrukh", firstName:"01234", lastName:"srk@icloud.com", RegistrationId:"0987", Address:"6478596541"}];

	
	mydbs.collection("customer").insertMany(mydata,function(err,response){
	if (err) throw err;
	
	console.log("Driver Collections are entered! ");
	db.close();	
	});
});
