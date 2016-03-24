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
				res.render('index', { title: 'Colenso Project', place: result.result });
			}
		}
	);
});

//Search 
router.get("/search",function(req,res){
	client.execute(tei + "for $t in //text where matches($t, '" + req.query.searchString + "', 'i') = true() return db:path($t)",
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