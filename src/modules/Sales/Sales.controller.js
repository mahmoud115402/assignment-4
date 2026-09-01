const { Router } = require('express');
const salesrouter = Router();

const {
    getAllSales,
    getSaleById,
    addSale,
    updateSale,
    deleteSale,
    getSalesByProduct
} = require('./Sales.service');


salesrouter.get('/', getAllSales);

salesrouter.get('/:id', getSaleById);

salesrouter.get('/product/:id', getSalesByProduct);

salesrouter.post('/', addSale);

salesrouter.put('/:id', updateSale);

salesrouter.delete('/:id', deleteSale);


module.exports = salesrouter;
