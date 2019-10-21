var express = require('express');
var hannah = require('./hannah');
var bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.set('view engine', 'ejs')


app.get('/', (req,res) => {
	// res.json({"MyCookie":"None", "BAD":true})
	console.log(req.query.name); 
	// hannah.foo(req,res);
	items = hannah.get_items(res);

	// res.send(items)
})

app.post('/mypost', (req,res) => {
	// res.json({"MyCookie":"None", "BAD":true})
	console.log(req.body); 
	res.send("<H1>Hello, " + req.body.fname + " "+ req.body.lname + " :)</H1>"); 

})


server = app.listen(80,"0.0.0.0", () => {
	console.log("Listening on port 3000...")
})