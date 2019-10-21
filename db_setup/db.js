var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs = require('fs');

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("DeliveryOrderingClone");
  var myobj = [
    { name: 'Chef Laio', address: 'Highway 71', tags: ["asian","chinese", "dinner"], image: Buffer.from(fs.readFileSync("photos/photo1.jpg")).toString('base64')},
    { name: 'Diner', address: 'Lowstreet 4', tags:["american","breakfast"], image: Buffer.from(fs.readFileSync("photos/photo2.jpg")).toString('base64') },
    { name: 'Krispy Kreme', address: 'Apple st 652', tags:["treats", "breakfast"], image: Buffer.from(fs.readFileSync("photos/photo3.jpg")).toString('base64')},
    { name: 'Quinoa palace', address: 'Mountain 21', tags: ["healthy","dinner","vegetarian"], image: Buffer.from(fs.readFileSync("photos/photo4.jpg")).toString('base64')},
  ];
  dbo.collection("restaurants").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    // db.close();
  });
   dbo.collection("restaurants").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  // dbo.collection("restaurants").drop(function(err, delOK) {
  //   if (err) throw err;
  //   if (delOK) console.log("Collection deleted");
  //   db.close();
  // });
   
});

