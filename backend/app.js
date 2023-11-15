const express = require('express'); // Import express module 
const bodyParser = require('body-parser'); // Import bodyPaser module to parse incoming http reqs
const stockController = require('./controllers/stockController');

const app = express(); // create instance of express application
const PORT = 3000;

app.use(bodyParser.json()); // configure bodyParser as middleware to handle incoming json data from HTTP requests

app.use('/api', stockController); // Apply stockController middleware to all requests under /api path.

//Use process.env.PORT when pushing in production.
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
