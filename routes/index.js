var express = require('express');
var router = express.Router();
var basex = require('basex');
var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
client.execute("OPEN Colenso");
var tei = "XQUERY declare default element namespace 'http://www.tei-c.org/ns/1.0'; ";

router.get("/",function(req,res){
	client.execute(tei + " (//name[@type='place'])[1] ", function (error, result) {
			if(error){console.error(error);}
			else {
				res.render('index', { title: 'Colenso Project', place: result.result });
			}
		}
	);
});

router.get("/search", function(req,res){
	client.execute(tei + "for $t in //text where matches($t, '" + req.query.searchString + "', 'i') = true() return db:path($t)",
		function (error, result) {
			if(error){
				res.status(500).send(error);
			} else {
				res.render('search', { title: 'Colenso Project', search_results: result.result.split('\n') });
			}
		}
	);
});

router.get("/browse", function(req,res){
	console.log("Here");
	client.execute(tei + "for $t in //text where matches($t, '" + " " + "', 'i') = true() return db:path($t)",
		function (error, result) {
			console.log("Here");
			if(error){
				res.status(500).send(error);
			} else {
				res.render('search', { title: 'Colenso Project', search_results: result.result.split('\n') });
			}
		}
	);
});

router.get("/documents/*",function(req,res){
	var xml_path = req.params[0]
	client.execute("XQUERY doc('Colenso/" + xml_path + "')",
		function (error, result) {
			if(error){
				res.status(404).send('Not found');
			}
			else {
				res.set('Content-Type', 'text/xml');
				res.send(result.result)
			}
		}
	);
});

module.exports = router;