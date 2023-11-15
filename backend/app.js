const express = require('express');
const bodyParser = require('body-parser');
const stockController = require('./controllers/stockController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', stockController);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
