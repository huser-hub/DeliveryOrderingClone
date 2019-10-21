module.exports = {
  foo: function handleGet(req,res) {
  			user = {"name":req.query.name}
			return res.render("blah.ejs",user)
		},
  get_items:  function get_items(res){
  	  var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";
		var fs = require('fs');
		var items = null;

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("DeliveryOrderingClone");
		  // var myobj = [
		  //   { name: 'Chef Laio', address: 'Highway 71', tags: ["asian","chinese", "dinner"], image: Buffer.from(fs.readFileSync("photos/photo1.jpg")).toString('base64')},
		  //   { name: 'Diner', address: 'Lowstreet 4', tags:["american","breakfast"], image: Buffer.from(fs.readFileSync("photos/photo2.jpg")).toString('base64') },
		  //   { name: 'Krispy Kreme', address: 'Apple st 652', tags:["treats", "breakfast"], image: Buffer.from(fs.readFileSync("photos/photo3.jpg")).toString('base64')},
		  //   { name: 'Quinoa palace', address: 'Mountain 21', tags: ["healthy","dinner","vegetarian"], image: Buffer.from(fs.readFileSync("photos/photo4.jpg")).toString('base64')},
		  // ];
		  // dbo.collection("restaurants").insertMany(myobj, function(err, res) {
		  //   if (err) throw err;
		  //   console.log("Number of documents inserted: " + res.insertedCount);
		  //   // db.close();
		  // });
		   dbo.collection("restaurants").findOne({}, function(err, result) {
		    if (err) throw err;
		    // console.log(result.name);
		    user = {"name":result.name,"photo": Buffer.from(result.image, 'base64')}
		    console.log(user)
		    res.render("photo.ejs",user);
		    db.close();
		  });
		   // console.log(val)
		  // dbo.collection("restaurants").drop(function(err, delOK) {
		  //   if (err) throw err;
		  //   if (delOK) console.log("Collection deleted");
		  //   db.close();
		  // });

		});
		return items
	}

// console.log(get_items());

};
  
