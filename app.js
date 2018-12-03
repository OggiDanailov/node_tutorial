/*jshint esversion: 6 */
const whatever = require("./whatever") 
const path = require("path")
const os = require("os")

const Joi = require("joi");
const express = require("express");
const app = express();
const fs = require('fs');
const url = require("url");
const http = require("http")

const EventEmitter = require("events");
const emitter = new EventEmitter;

emitter.on('w', (arg) => console.log('something from event', arg) )

emitter.emit('w', {id: 1, url: 'http://www.abv.bg'})


var p = path.parse(__filename)
console.log(p)

var o = os.freemem()
console.log(o)
console.log(os.totalmem())



app.use(express.json());

const courses = [
	{id: 1, name: "chemestry"},
	{id: 2, name: 'biology' },
	{id: 3, name: "physics"}
];





app.get("/", (req, res)=>{
	res.send("hellow whatever hell")
});

// index action
app.get("/api/courses", (req, res) => {
	res.send(courses)
});

// new and create methods
app.post("/api/courses", (req, res) =>{
	// Joi module validation
	const schema = {
		name: Joi.string().required().min(3)
	};
	const result = Joi.validate(req.body, schema);

	// validation written by hand
	if(!req.body.name || req.body.name.length < 3){
		res.send(400).send("Name is required and can not be shorted than 3");
		return; 
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	}
	courses.push(course)
	res.send(course)
});


// show method
app.get("/api/users/:id", (req, res) => {
	let course = courses.find(el => el.id == parseInt(req.params.id))
	if(!course){
		res.status(404).send("something is wrong = no such id")
	}else {
		res.send(course)
	}

});

// update

app.put("/api/courses/:id", (req, res) => {
	let course = courses.find(el => el.id == parseInt(req.params.id))
	if(!course){
		res.status(404).send("something is wrong = no such id")
	}

	const schema = {
		name: Joi.string().required().min(3)
	}
	const result = Joi.validate(req.body, schema)
	if(result.error){
		res.status(400).send(result.error.details[0].message)
	}

	course.name = req.body.name;
	res.send(course)

});




// my challenge
const users = [
	{id: 1, name: 'Oggi', active: true},
	{id: 2, name: "Boro", active: false},
	{id: 3, name: "George", active: true},
	{id: 4, name: "Rad", active: false},
	{id: 5, name: "Spas", active: true},
	{id: 6, name: "Vasil", active: false}
]

app.get("/users", (req, res) => {	
	activeUsers = req.query.active
	console.log(activeUsers)
	if(activeUsers){	
	var userList = users.filter(el => el.active ==  Boolean(activeUsers))
		var userNames = userList.map(el => el.name)
		res.send(userNames)
	}else {
		res.send(users)
	}
			
});

app.get("/reading", (req,res) => {
	var address = "http://localhost:3001/reading"
	var q = url.parse(address)
	res.send(q)



	// var something = fs.appendFile("content.txt", "This is whatever wrttien by me")


	// var content = fs.readFile("content.txt", function(err, data){
	// res.writeHead(200, {'Content-Type': 'text/html'});
 //    res.write(data);
 //    res.end();
	// })

});




const port = process.env.PORT || 3001; 
app.listen(port, ()=> console.log(`Listeneing on the port ${port}`));