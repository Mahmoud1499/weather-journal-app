// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { request, response } = require("express");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server bda2t mn hnaaaa

const port = 8000;
app.listen(port, (request, response) => {
  console.log(`listing on port ${port}`);
});

// Post Route
app.post("/addData", async (request, response) => {
  const info = await request.body;
  projectData = info;
  //   console.log(projectData);
  response.send(projectData);
});
// get route
app.get("/allData", async (request, response) => {
  //   console.log(projectData);
  response.send(projectData);
});
