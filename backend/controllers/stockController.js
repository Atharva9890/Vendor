const express = require('express');
const stockService = require('../services/stockService'); //import stockService module to use updateStock, readData in api calls.

const router = express.Router(); //create router object to define routes and middlewares

//GET method to get all the apparels from databse/local json file. This API is not mentioned in TEST Document, it is added for testing purpose.
router.get('/allApparels', (req, res) => {
    try {
        const data = stockService.readData()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: 'Server Error!' })
    }
})

//Updates the stock quantity and price of one apparel code and size. 
//Pass the apparelCode and size in request body
router.put('/:apparelCode/:size', (req, res) => {
    try {
        const { apparelCode, size } = req.params; //Destructure code and size from request parameter
        const { quantity, price } = req.body; //Destructure quantity and price from request body

        const result = stockService.updateStock(apparelCode, size, quantity, price);

        res.json(result);
    } catch (error) {
        console.error(error); //For debugging purpose, should be removed when pushing to production
        res.status(500).json({ message: 'Server Error!' });
    }
});

// Simultaneously update the stock quantity and price of several apparel codes and sizes.
router.put('/updateMultipleStockPrices', (req, res) => {
    try {
        const updates = req.body; // Assuming request body will get array of stocks to be updated. (Content Type will be application/json when testing)

        for (const update of updates) { // Loop through each stock that needs to be updated and call updateStock function to update that stock
            const { apparelCode, size, quantity, price } = update;
            stockService.updateStock(apparelCode, size, quantity, price);
        }

        res.json({ message: 'Stock and price updated successfully for multiple apparel codes and sizes' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST API to check if the requirement of a customer order can be fulfilled or not
router.post('/checkOrderFulfillment', (req, res) => {
    try {
        const orderItems = req.body; // Assuming request body will get array of stock/s that to be fulfilled . (Content Type will be application/json when testing)

        for (const item of orderItems) { // Iterating over each order
            const { apparelCode, size, quantity } = item; // Destructure apparelCode, size and qunatity from individual order
            const apparelData = stockService.readData();

            // Check if we can fulfill current order by checking availability of apparel, size and quantity
            if (
                !apparelData[apparelCode] ||
                !apparelData[apparelCode][size] ||
                apparelData[apparelCode][size].quantity < quantity
            ) {
                return res.json({ canFulfill: false, message: 'Sorry, Order cannot be fulfilled' });
            }
        }

        res.json({ canFulfill: true, message: 'Order can be fulfilled' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST API to get the lowest cost at which the order can be fulfilled
router.post('/lowestCostForOrder', (req, res) => {
    try {
        const orderItems = req.body; // Assuming request body will get array of stock/s that to be fulfilled . (Content Type will be application/json when testing)

        let totalCost = 0;

        for (const item of orderItems) { // Iterating over each order
            const { apparelCode, size, quantity } = item; // Destructure apparelCode, size and qunatity from individual order
            const apparelData = stockService.readData();

            // Check if we can fulfill current order by checking availability of apparel, size and quantity
            if (
                !apparelData[apparelCode] ||
                !apparelData[apparelCode][size] ||
                apparelData[apparelCode][size].quantity < quantity
            ) {
                return res.json({ message: 'Sorry, Order cannot be fulfilled' });
            }

            const itemCost = apparelData[apparelCode][size].price * quantity;
            totalCost += itemCost; // Calculating totalCost 
        }

        res.json({ message: `Minimum cost for order will be : INR ${totalCost}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error!' });
    }
});


module.exports = router; // Export controller router to use in app.js file
