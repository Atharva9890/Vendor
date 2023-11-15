const fs = require('fs'); // import file system module
const path = require('path');// import path module 

const dataFilePath = path.join(__dirname, '../data/apparelData.json'); // get the file path of local json file

// Reads data from local json file using file system module.
const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { message: 'Could not read the file. Check the file path.' };
    }
};

// Writes/Updates data inot local json file using file system module.
const updateData = (data) => {
    const updatedJsonData = JSON.stringify(data)
    fs.writeFileSync(dataFilePath, updatedJsonData, 'utf-8')
}

const updateStock = (apparelCode, size, quantity, price) => {
    const apparelData = readData();

    // Check if requested apparel or its size exists in our db/local json file
    if (!apparelData[apparelCode] || !apparelData[apparelCode][size]) {
        return { message: 'No Stock available!' };
    }

    // Update the requested apparel with new quantity and price
    // We can also use spread operator : apparelData[apparelCode] = {...apparelData[apparelCode], [size]: {quantity, price}}
    apparelData[apparelCode][size] = {
        quantity,
        price,
    };
    updateData(apparelData)
    return { message: 'Stock updated successfully', modifiedData: apparelData };
};

module.exports = {
    updateStock,
    readData,
}; // Exports this functions to use in stockController file.
