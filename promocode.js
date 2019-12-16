var MongoClient = require ('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, {useUnifiedTopology: true}, function ( err, db){
	if (err) throw err;
	var mydbs = db.db("HastePickupService");
	
	var mydata =[{"Promo_id":"22","promo_name":"bubble","discount_type":"percent","activation_date":"dec15","ending_date":"aug16"},
		{"Promo_id":"23","promo_name":"zig-zag","discount_type":"percent","activation_date":"apr09","ending_date":"june13"},
			{"Promo_id":"24","promo_name":"lemonade","discount_type":"percent","activation_date":"sept25","ending_date":"oct05"},
				{"Promo_id":"25","promo_name":"cup-cake","discount_type":"percent","activation_date":"jan17","ending_date":"mar18"}];

	
	mydbs.collection("Promotion_code").insertMany(mydata,function(err,response){
	if (err) throw err;
	
	console.log("Promo code Collections are entered! ");
	db.close();	
	});
});
