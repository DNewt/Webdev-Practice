var express = require('express');
var router = express.Router();
var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");
var tei = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; ";

//Get the Homepage
router.get("/",function(req,res){
	client.execute(tei + " (//name[@type='place'])[1] ", function (error, result) {
			if(error){console.error(error);}
			else {
				res.render('index', { title: 'Colenso Project', place: result.result, database_list: [] });
			}
		}
	);
});

//Search 
router.get("/search",function(req,res){
	console.log("tei + searchString: " + tei + req.query.searchString);
	client.execute(tei+ req.query.searchString,
		function (error, result) {
			if(error){ 
				console.error(error);
			}
			else {
				console.log("result: " + result.result);
				res.render('index', { title: 'Colenso Project', search_result: result.result });
			}
		}
	);
});

module.exports = router;