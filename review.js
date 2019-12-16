var MongoClient = require ('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useUnifiedTopology: true}, function ( err, db){
	if (err) throw err;
	var mydbs = db.db("HastePickupService");
	
	var mydata =[{"created_at": "mar15","rating_id":"51","_id":"91"},
	{"created_at": "jul19","rating_id":"52","_id":"92"},
	{"created_at": "jan15","rating_id":"53","_id":"93"},
	{"created_at": "oct09","rating_id":"54","_id":"94"}];

	
	mydbs.collection("Review").insertMany(mydata,function(err,response){
	if (err) throw err;
	
	console.log("Review Collections are entered! ");
	db.close();	
	});
});
