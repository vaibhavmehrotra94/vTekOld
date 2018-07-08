'use strict';
// Variables
	var express 	= require('express'),
		app 		= express(),
		bodyParser 	= require('body-parser'),
		mongodb 	= require('mongodb'),
 		mongoose	= require('mongoose'),
 		busboy 		= require('connect-busboy'),
		path 		= require('path'),
		// fileupload  = require('express-fileupload'),
		fs 			= require('fs-extra');

// Connecting to MongoDB & checking Connection
	mongoose.connect("mongodb://localhost:27017/vapptek");
	
	// var mongoClient = mongodb.MongoClient;
	var db = mongoose.connection;

	db.on("error", function(err){
	   console.error("connection error:", err);
	});

	db.once("open", function(){
	    console.log("database connection was successfull !");
	});  

// Setting Database Schema & Model
	var profileSchema = new mongoose.Schema({
	    firstName: String,
	    lastName: String,
	    phone: Number,
	    time: {type: Date, default: Date.now},
	    email: String,
	    jobType: String,
	    resume: {type: String, default: 'not there'}
	});

	var profile = mongoose.model("profile", profileSchema);

// Setting 
	app.set("view engine","ejs");
	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({ extended: true}));
	// app.use(busboy());

// ***************Routes*****************
// Home Page
	app.get("/", function(req,res){
		res.render("index");
	});

// Services Page
	app.get("/services", function(req,res){
		res.render("services");
	});

// Contact Page
	app.get("/contact", function(req,res){
		res.render("contact");
	});

// About Page
	app.get("/aboutUs", function(req,res){
		res.render("about");
	});

// Careers Page
	// Get Request
		app.get("/careers", function(req,res){
			res.render("careers");
		});

	// Post request
		app.post("/careers/new", function(req,res){
			
		// Getting Data from form
			var firstName = req.body.firstName,
			    lastName  = req.body.lastName,
			    phone     = req.body.phoneNo,
			    time      = new Date(),
			    email     = req.body.email,
			    jobType   = req.body.jobType;

	        var fstream,
				path;

	        req.pipe(req.busboy);
	        req.busboy.on('file', function(fieldname, file, filename){
	            // console.log("Uploading file");

	            //Path where image will be uploaded
	            path = __dirname + '/public/resume/' + filename;
	            fstream = fs.createWriteStream(path);
	            file.pipe(fstream);
	            // fstream.on('close', function(){    
	            //     console.log("Upload Finished : " + filename);              
	            // });
	        });

	        
			// object for uploading in database
			var newProfile = {
				firstName: firstName,
			    lastName:  lastName,
			    phone:     phone,
			    time:      time,
			    email: 	   email,
			    jobType:   jobType,
			    // resume:	   path
				};

			profile.create(newProfile, function(err, profiles){
		        if(err){
		            console.log("ERROR!!");
		            console.log(err);
		        }else{
		            console.log(profiles);
		            res.redirect("/careers");
		        }
		    });
		});




app.get("*", function(req,res){
	res.send("Invalid route!!!!");
});

app.listen(1337, "127.0.0.1", function(){
	console.log("server connected at http://127.0.0.1:1337/");
});