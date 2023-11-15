const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/apparelData.json');

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { message: 'Could not read the file. Check the file path.' };
    }
};

const updateStock = (apparelCode, size, quantity, price) => {
    const apparelData = readData();

    if (!apparelData[apparelCode]) {
        apparelData[apparelCode] = {};
    }

    if (!apparelData[apparelCode][size]) {
        apparelData[apparelCode][size] = {};
    }

    apparelData[apparelCode][size] = {
        quantity,
        price,
    };

    return { success: true, message: 'Stock updated successfully', modifiedData: apparelData };
};

module.exports = {
    updateStock,
    readData,
};
