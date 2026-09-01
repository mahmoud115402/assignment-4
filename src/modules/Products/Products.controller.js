const { Router } = require('express');

const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
} = require('./Products.service');

const productrouter = Router();


// ==================== GET ALL PRODUCTS ====================
productrouter.get('/', getAllProducts);

// ==================== GET PRODUCT BY ID ====================
productrouter.get('/:id', getProductById);

// ==================== ADD PRODUCT ====================
productrouter.post('/', addProduct);

// ==================== UPDATE PRODUCT ====================
productrouter.put('/:id', updateProduct);

// ==================== DELETE PRODUCT ====================
productrouter.delete('/:id', deleteProduct);


module.exports = productrouter;
