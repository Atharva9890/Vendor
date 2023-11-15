const express = require('express');
const stockService = require('../services/stockService');

const router = express.Router();

router.get('/allApparels', (req, res) => {
    try {
        const data = stockService.readData()
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: 'Server Error!' })
    }
})

router.put('/:apparelCode/:size', (req, res) => {
    try {
        const { apparelCode, size } = req.params;
        const { quantity, price } = req.body;

        // Add validation if needed

        const result = stockService.updateStock(apparelCode, size, quantity, price);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// PUT endpoint to simultaneously update stock and price for multiple apparel codes and sizes
router.put('/updateMultipleStockPrices', (req, res) => {
    try {
        const updates = req.body;

        // Add validation if needed

        for (const update of updates) {
            const { apparelCode, size, quantity, price } = update;
            stockService.updateStock(apparelCode, size, quantity, price);
        }

        res.json({ success: true, message: 'Stock and price updated successfully for multiple apparel codes and sizes' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST endpoint to check if the requirement of a customer order can be fulfilled
router.post('/checkOrderFulfillment', (req, res) => {
    try {
        const orderItems = req.body;

        // Add validation if needed

        for (const item of orderItems) {
            const { apparelCode, size, quantity } = item;
            const apparelData = stockService.readData();

            if (
                !apparelData[apparelCode] ||
                !apparelData[apparelCode][size] ||
                apparelData[apparelCode][size].quantity < quantity
            ) {
                return res.json({ canFulfill: false, message: 'Order cannot be fulfilled' });
            }
        }

        res.json({ canFulfill: true, message: 'Order can be fulfilled' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error!' });
    }
});

// POST endpoint to get the lowest cost at which the order can be fulfilled
router.post('/lowestCostForOrder', (req, res) => {
    try {
        const orderItems = req.body;

        // Add validation if needed

        let totalCost = 0;

        for (const item of orderItems) {
            const { apparelCode, size, quantity } = item;
            const apparelData = stockService.readData();

            if (
                !apparelData[apparelCode] ||
                !apparelData[apparelCode][size] ||
                apparelData[apparelCode][size].quantity < quantity
            ) {
                return res.json({ success: false, message: 'Order cannot be fulfilled' });
            }

            const itemCost = apparelData[apparelCode][size].price * quantity;
            totalCost += itemCost;
        }

        res.json({ success: true, totalCost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


module.exports = router;
