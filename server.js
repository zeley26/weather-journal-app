// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require body-parser and cors
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup Server
const PORT = 3000;

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/', (req, res) => {
    res.sendFile('./website/index.html');
})

// Test route to check if server is running
app.get('/all', (req, res) => {
    res.json(projectData);
});

// POST method route
app.post('/data', (req, res) => {
    const { temp, user_response, date } = req.body;
    console.log("am i getting it?", temp, user_response, date)

    projectData.temp = temp;
    projectData.user_response = user_response;
    projectData.date = date;

    res.json(projectData);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Make sure everything is working properly!');
});