var express = require('express');
var router = express.Router();
var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");

console.log("WORK");
console.log("fuck");

//router.get("/", function(req, res) {
 // res.render('index', { title: 'Colenso' });
//});
/* GET home page. */
router.get('/', function(req, res){
	client.execute("XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0';" + " (//name[@type='place'])[1] ",
	function(error, result){
		if(error){ 
			console.error(error);}
		else {
  			res.render('index', { title: 'Colenso' });
 		}
  		}
 		);
});

module.exports = router;

router.get('/search', function(req,res){
	console.log("FGUDIFHI");
	res.render('search', { title: 'Colenso', content: req.query.searchString }, function(err, html) {
		console.log("big dumb nerd");	
	});
});
