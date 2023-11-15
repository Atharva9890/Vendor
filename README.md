# Apparel Management System

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

### Installation
1. Clone the repository and cd into backend
2. Run following commands to initialise and start node server :
     -  -> npm install
     -  -> npm start
     -  -> install express, body-parser and mongodb modules using npm/yarn

#### Testing APIS

1. To test "Update the stock quality and price of one apparel code and size."(First) API :
     -  -> open postman and use PUT option
     -  -> use this url : /api/stock/:apparelCode/:size
     -  -> eg url http://localhost:3000/api/Brand10/small
     -  -> For successful request <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/18bcb163-b62d-4a7c-b7ac-a0ce6d0306bf">
     -  -> For unsuccessful request <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/c20627b6-5a3c-415e-83ea-0164462d9592">

2. To test "Simultaneously update the stock quality and price of several apparel codes and sizes."(Second) API :
     -  -> open postman and use PUT option
     -  -> use this url : /api/updateMultipleStockPrices
     -  -> eg url http://localhost:3000/api/updateMultipleStockPrices
     -  -> make sure to pass array of stocks and in headers add Content-Type as application.json
     -  -> For successful request ![image](https://github.com/Atharva9890/Vendor/assets/73189698/1d21d686-5245-49f0-bd7f-2ae5d2d5c0df)
     -  -> For unsuccessful request <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/82bfd49c-0e1c-4247-b9b5-f6b061ee0086">
     
3. To test "To check If I can fulfill the requirement of a customer order."(Third) API :
     -  -> open postman and use POST option
     -  -> use this url : /api/checkOrderFulfillment
     -  -> eg url http://localhost:3000/api/checkOrderFulfillment
     -  -> For successful request  <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/edda206c-442b-4e00-b453-68e3a28a7b88">
     -  -> For unsuccessful request <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/59edfde4-0a95-4657-96ea-977bcf1805c6">
     
4. To test "To know the lowest cost at which I can get the order fulfilled."(Fourth) API :
     -  -> open postman and use POST option
     -  -> use this url : /api/lowestCostForOrder
     -  -> eg url http://localhost:3000/api/lowestCostForOrder
     -  -> For successful request <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/b28680d1-3915-44c3-b0dc-fbd01113657f">

5. To test "Get all apparels" API :
     -  -> open postman and use GET option
     -  -> use this url : /api/allApparels
     -  -> eg url http://localhost:3000/api/allApparels
     -  -> For successful request <img width="1440" alt="image" src="https://github.com/Atharva9890/Vendor/assets/73189698/ca3e5435-bdb6-449e-8c85-2e76385fc1c1">

#### Validations to add(Improvements)

1. For Update Stock Quality and Price API :
   - Validate the presence of quantity and price in the request body.
   - Ensure that quantity and price are non-negative values.
   - Check if the specified apparelCode and size exist in the data.
   - Validate that the provided apparelCode and size are alphanumeric strings.

2. For Update Stock Quality and Price (Second) API :
   - Validate the presence of an array of updates in the request body.
   - Validate that quantity and price in each update are non-negative values.

3. For Check Order Fulfillment :
   - Validate the presence of orderItems in the request body.
   - Validate that quantity in each orderItem is a non-negative integer.
   - Check if the specified apparelCode and size exist in the data for each orderItem.
     
4. For Lowest Cost for Order API :
   - Validate the presence of orderItems in the request body.
   - Ensure that each orderItem has apparelCode, size, and quantity properties.
   - Validate that quantity in each orderItem is a non-negative integer.

