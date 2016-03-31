/*
 * GET signup page.
 */
var ejs = require("ejs");
var mysql = require('./mysql');
var title="";

exports.signup = function(req, res) {
	
	res.render('signup', {
		title: title
	});
};
exports.signed = function(req, res) {

	// res.render('signup');
	var fname = req.body.FirstName;
	var details = {
		fname : req.body.FirstName,
		lname : req.body.LastName,
		dob : req.body.dob,
		email : req.body.email,
		password : req.body.password,
		Thandle : req.body.Thandle,
		phone : req.body.phone
	};
	var detailsS = JSON.stringify(details);
	var detailsP = JSON.parse(detailsS);
	console.log(detailsP.dob);
	var checkTHflag = true;
	console.log(fname);
	var checkTH = "SELECT thandle, email FROM userdetails WHERE email='"
			+ detailsP.email + "' or thandle='" + detailsP.Thandle + "'";
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				console.log("EMAIL/THANDLE ALREADY TAKEN");
				checkTHflag = false;
				title="Email/thandle already taken";
				
				// res.render('signup',{ errmsg: 'This email/thandle already
				// taken'});
			} else {
				console.log("email/thandle not taken. Good to go!");
			}
		}
	}, checkTH);
	if (checkTHflag==true) {
		var queryStr = "INSERT INTO userdetails VALUES('" + detailsP.fname
				+ "', '" + detailsP.lname + "', " + "STR_TO_DATE('"
				+ detailsP.dob + "','%Y-%d-%m')" + ", '" + detailsP.email
				+ "', '" + detailsP.password + "','" + detailsP.Thandle
				+ "', '" + detailsP.phone + "')";
		// var queryStr="INSERT INTO USERDETAILS
		// VALUES('fn','lna',STR_TO_DATE('1-01-2012',
		// '%d-%m-%Y'),"+detailsP.email+"'pass','thandle','123')"";
		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				res.render('login');
			}
		}, queryStr);
	}
	;

};