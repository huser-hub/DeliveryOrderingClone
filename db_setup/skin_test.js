var mongojs = require('mongojs');
var db = mongojs('localhost/DeliveryOrderingClone');
var mycollection = db.collection('restaurants');

db.mycollection.find(function (err, docs) {
	// docs is an array of all the documents in mycollection
	console.log(docs)
})

db.close()