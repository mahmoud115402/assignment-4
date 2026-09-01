const express = require('express');
const app = express();
const port = 3000;
const connection = require('./DB/connectionDB');
const productrouter = require('./modules/Products/Products.controller');
const supplierrouter = require('./modules/Suppliers/Suppliers.controller');
const salesrouter = require('./modules/Sales/Sales.controller');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.use('/products', productrouter);
app.use('/suppliers', supplierrouter);
app.use('/sales', salesrouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
