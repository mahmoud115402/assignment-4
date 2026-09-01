const { Router } = require('express');

const supplierrouter = Router();

const {
    SUPPLIERS,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
    addSupplier
} = require('./Suppliers.service');


// ==================== GET ALL SUPPLIERS ====================
supplierrouter.get('/', SUPPLIERS);

// ==================== GET SUPPLIER BY ID ====================
supplierrouter.get('/:id', getSupplierById);

// ==================== ADD SUPPLIER ====================
supplierrouter.post('/', addSupplier);

// ==================== UPDATE SUPPLIER ====================
supplierrouter.put('/:id', updateSupplier);

// ==================== DELETE SUPPLIER ====================
supplierrouter.delete('/:id', deleteSupplier);


module.exports = supplierrouter;
