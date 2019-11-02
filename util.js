module.exports = {
  foo: function handleGet(req,res) {
  			user = {"name":req.query.name}
			return res.render("blah.ejs",user)
		},
  get_items:  function get_items(res,user){
  	  var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";
		var items = null;

		MongoClient.connect(url, function(err, db) {
		  if (err) {
		  	console.log("Please start mongdb using mongod");
		  	throw err;
		  }
		  var dbo = db.db("DeliveryOrderingClone");

		  dbo.collection("restaurants").find({}).toArray(function(err, result) {
		    if (err) throw err;
		    data1 =[];
		    for(var g in result){
		    	data1.push({"name":result[g].name,"photo":result[g].image});
		    }
		    us = {"data1":data1,"user":user}

		    var content='';
			res.render('home.ejs', us, function(err, html) {
			   content = html;
			});

		    res.send(content)
		  });
		});
		return items
	},
	get_res:  function get_res(res,nname,user){
  	  var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, function(err, db) {
		  if (err) {
		  	console.log("Please start mongdb using mongod");
		  	throw err;
		  }
		  var dbo = db.db("DeliveryOrderingClone");

		   dbo.collection("restaurants").find({name:nname}).toArray((err, result) => {
		    if (err) throw err;
		    data1 = []//result[0]
		    for(var g in result){
		    	data1.push({"name":result[g].name,"tags":result[g].tags});
		    }
		   	us = {"data1":data1,"user":user}

		    // console.log(data1)
		    res.render("restaurant.ejs",us)
		    db.close();
		  });


		});
	},
	create_user_db: function create_user_db(){

		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";
		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("DeliveryOrderingClone");
		  dbo.createCollection("users", function(err, res) {
		    if (err) throw err;
		    console.log("Collection 'users' created!");
		    db.close();
		  });
		});
	},
	insert_user: function insert_user(user){
		var MongoClient = require('mongodb').MongoClient;
		var url = "mongodb://localhost:27017/";

		MongoClient.connect(url, function(err, db) {
		  if (err) throw err;
		  var dbo = db.db("DeliveryOrderingClone");
		  
		  dbo.collection("users").insertOne(user, function(err, res) {
		    if (err) throw err;
		    console.log("1 user inserted",user);
		    db.close();
		  });
		});
	}
	// get_image:  function get_items(res,name){
 //  	  	var MongoClient = require('mongodb').MongoClient;
	// 	var url = "mongodb://localhost:27017/";
	// 	var fs = require('fs');
	// 	var items = null;

	// 	MongoClient.connect(url, function(err, db) {
	// 	  if (err) {
	// 	  	console.log("Please start mongdb using mongod");
	// 	  	throw err;
	// 	  }
	// 	  var dbo = db.db("DeliveryOrderingClone");

	// 	   dbo.collection("restaurants").find({name:'Chef Laio'}).toArray((err, result) => {
	// 	    if (err) throw err;
	// 	    result = result[0]
	// 	    // console.log("HERE")
	// 	    // res.render("photo.ejs",user);
	// 	    res.send(Buffer.from(result.image, 'base64'));
	// 	    db.close();
	// 	  });


	// 	});
	// }

// console.log(get_items());

};
  
