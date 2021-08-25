// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, listening);

function listening() {
  console.log(`server is running on port: ${port}`);
}

//Add a GET route that sends the projectData object in your server code
app.get('/all', sendData);
function sendData(req, res){
  res.send(projectData)
}

//add a POST route that adds incoming data to projectData.
app.post('/', addData);
function addData(req, res){
  //The POST route should anticipate receiving three pieces of data from the request body
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    userresponse: req.body.userresponse
  }
  //Make sure your POST route is setup to add each of these values with a key to projectData.
  console.log(projectData);
  res.send(projectData);
}
