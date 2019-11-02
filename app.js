var express = require('express');
var util = require('./util');
var pw = require('./password');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongojs = require('mongojs');
var db = mongojs('localhost/DeliveryOrderingClone');
var restaurants = db.collection('restaurants');
var users = db.collection('users');
var ejs = require('ejs')


// var bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
    }
}));


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/image'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/js'));



// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//     if (req.cookies.user_sid && !req.session.user) {
//         res.clearCookie('user_sid');        
//     }
//     next();
// });


function handle_home_page(req,res) {
	// console.log(req.query.name);
	// hannah.foo(req,res);
	// sess = req.session;
	// cck = req.cookies
	// console.log(cck)
	// console.log(sess)

    // if(!sess.user) {
    // 	if(!cck.user_sid)
    //     	return res.redirect('/account');
    //     else
    //     	sess.user = "ppoo";
    // }

    // console.log(cck)
    //TODO look up SID in DB and assign session here
    console.log("In home:",req.session.user)



    if(typeof req.session.user !== 'undefined' &&  req.session.user){
    	req.session.user.visits += 1;
		var myquery = { name: req.session.user.name};
	  	var newvalues = { $set: {visits:req.session.user.visits } };
	  	users.updateOne(myquery, newvalues, function(err, res) {
		    if (err) throw err;
		    console.log("1 document updated");
		    // db.close();
		  });
	 }


	obj = pw.create_salt(8)
	items = util.get_items(res,req.session.user)
}
function handle_account_page(req,res) {
	error = req.query.error
	res.render("account.ejs",{"error":error})
	// hannah.foo(req,res);
	// items = util.get_items(res);
}
function handle_login_page(req,res) {
	// res.render("login.ejs")

	sess = req.session;

	un = req.body.username
	pass = req.body.password


   users.find({name:un}).toArray(function(err, result) {
	    if (err) throw err;

	    //TODO Password verification here


	    // console.log(result);
	    if (result.length>0){
	    	userinfo = result[0]

	    	// userinfo CC dob 
	    	req.session.user = userinfo
	    	// console.log("Set User!")
	    	res.redirect("/")
	    }
	    else {
	    	console.log("invalid user")
	    	res.redirect("/account?error=invalid%20user")
	    }
	    	    // db.close();
	  });

   // res.redirect("/account");
	// sess.user = "ppoo";
	// console.log(sess)
// 
	// res.send("<a href='/'>Home</a>")
}

function handle_restaurant(req,res) {
	// res.render("login.ejs")
	// var img_name  = req.params.name
	var img_name = req.query.name
	console.log("here")
	// console.log(img_name)
	util.get_res(res,img_name,req.session.user);

	// res.send("login successful -" + img_name);
}
function handle_register(req,res) {
	res.render("register.ejs")
}
// function handle_getme(req,res){
// 	// console.log(req)
// 	var items = util.get_items(res,req.session.user)
// 	console.log(items)
// 	// res.send(items)
// 	// ejs.render('views/home.ejs', data, function(err, str){
//     // str => Rendered HTML string
//     // console.log(str)
// // });
// }
function get_restaurants(req,res){
	restaurants.find({}).toArray(function(err, result) {
		    if (err) throw err;
		    data1 =[];
		    for(var g in result){
		    	data1.push({"name":result[g].name,"photo":result[g].image});
		    }
		    us = {"data1":data1,"user":req.session.user}

		    var content='';
			res.render('restaurants.ejs', us, function(err, html) {
			   content = html;
			});

		    res.send(content)
		});
}
function handle_home(req,res){
	res.render("home.ejs")
}
function get_account(req,res){
	error = req.query.error
	// res.render("account.ejs",{"error":error})
	 var content='';
			res.render('account.ejs', {"error":error},function(err, html) {
			   content = html;
			});

		    res.send(content)
}
app.get('/', handle_home)

app.get('/get_account',get_account)
app.get('/account',handle_account_page)
app.post('/login',handle_login_page)
app.get('/register',handle_register)
app.get("/get_restaurants",get_restaurants)
app.get('/res',handle_restaurant)
// app.get('/getme',handle_getme)
app.post('/new_user', function(req, res){
    // console.log(request.body.user.name);
    // console.log(request.body.email);
    new_user = {"email":req.body.email, "username":req.body.username}
    // console.log(new_user)
    res.send(new_user)
});

app.post('/logout', function(req,res) {
	res.clearCookie('user_sid');  
	res.redirect('/')
})


// app.get('/img/:type_?', (req,res) => {
// 	// res.json({"MyCookie":"None", "BAD":true})
// 	// console.log("Inside img" +  type);
// 	var img_name  = req.params.type_

// 	// hannah.foo(req,res);
// 	// items = hannah.get_items(res);

// 	// res.send("Hello")
// 	console.log("HERE",img_name)
// 	util.get_image(res,img_name);
// })

// app.get('/exa', (req,res) => {
// 	// res.json({"MyCookie":"None", "BAD":true})
// 	// console.log("Inside img" +  type);
// 	// var img_name  = req.params.type_

// 	// // hannah.foo(req,res);
// 	// // items = hannah.get_items(res);

// 	// // res.send("Hello")
// 	// hannah.get_image(res,img_name);
// 	res.render("ex.ejs")
// })

app.post('/mypost', (req,res) => {
	// res.json({"MyCookie":"None", "BAD":true})
	console.log(req.body); 
	res.send("<H1>Hello, " + req.body.fname + " "+ req.body.lname + " :)</H1>"); 

})


server = app.listen(80,"0.0.0.0", () => {
	console.log("Listening on port 3000...")
})