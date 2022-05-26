//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/hospitalsDB", {useNewUrlParser:true})

const psychiatristSchema= {
    First_Name: String,
    Last_Name: String,
    Hospital_name: String,
    phoneNumber: String,
    pinCode: String,
    State: String
  };
  const psychiatrist = mongoose.model("psychiatrist", psychiatristSchema);

//TODO

//////////  For taking requests of psychiatrists    ////////////////

app.route("/psychiatrist")

.get(function(req,res){
    psychiatrist.find(function(err,foundPsychiatrist){
        res.send(foundPsychiatrist);
    })
})

.post(function(req,res){
    const newPsychiatrist= new psychiatrist({
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Hospital_name: req.body.Hospital_name,
        phoneNumber:req.body.phoneNumber,
        pinCode: req.body.pinCode,
        State: req.body.State
    })
    newPsychiatrist.save(function(err){
        if(!err){
            res.send("successfully added new psychy to the db")
        }
    });
})

.delete(function(req,res){
    psychiatrist.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted all items")
        }
        else{
            res.send(err);
        }
    });
});

////////// for taking requests of particular psychiatrist
app.route("/psychiatrist/:psychiatristName")

.get(function(req,res){
    Patient.findMany({psychiatristname: req.params.psychiatristName}, function(err,foundPatient){
        if (foundPatient){
            res.send(foundPatient);
        }
        else{
            res.send("Not found");
        }
    })
})

//////////  For taking requests of patients    ////////////////

const patientsSchema= {
    Name: String,
    Address: String,
    email: String,
    phoneNumber:String,
    pasword: String,
    psychiatristname:String
    // img: String
  };
  const Patient = mongoose.model("Patient", patientsSchema);

app.route("/Patients")

.get(function(req,res){
    Patient.find(function(err,foundPatient){
        res.send(foundPatient);
    })
})

.post(function(req,res){
    const newPatient= new Patient({
        Name: req.body.Name,
        Address: req.body.Address,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        pasword: req.body.pasword,
        psychiatristname: req.body.psychiatristname
        // : req.body.
    })
    newPatient.save(function(err){
        if(!err){
            res.send("successfully added new patient in the db")
        }
        else{
            res.send(err);
        }
    }
    )
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});