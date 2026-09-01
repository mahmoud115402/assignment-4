const connection = require('../../DB/connectionDB');

const getAllProducts = async (req, res) => {

    try {
        const [results] = await connection.query(
            'SELECT * FROM products'
        );

        res.json(results);

    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const getProductById = async (req, res) => {

    const productId = req.params.id;

    try {
        const [results] = await connection.query(
            'SELECT * FROM products WHERE Product_ID = ?',
            [productId]
        );

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json(results[0]);

    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const addProduct = async (req, res) => {

    const {
        Product_Name,
        Price,
        Stock_Quantity,
        Supplier_ID
    } = req.body;

    try {
        const [results] = await connection.query(
            `INSERT INTO products
            (Product_Name, Price, Stock_Quantity, Supplier_ID)
            VALUES (?, ?, ?, ?)`,
            [
                Product_Name,
                Price,
                Stock_Quantity,
                Supplier_ID
            ]
        );

        res.status(201).json({
            message: 'Product added successfully',
            Product_ID: results.insertId
        });

    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const updateProduct = async (req, res) => {

    const productId = req.params.id;

    const {
        Product_Name,
        Price,
        Stock_Quantity,
        Supplier_ID
    } = req.body;

    try {
        const [results] = await connection.query(
            `UPDATE products
            SET Product_Name = ?,
                Price = ?,
                Stock_Quantity = ?,
                Supplier_ID = ?
            WHERE Product_ID = ?`,
            [
                Product_Name,
                Price,
                Stock_Quantity,
                Supplier_ID,
                productId
            ]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json({
            message: 'Product updated successfully'
        });

    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const deleteProduct = async (req, res) => {

    const productId = req.params.id;

    try {
        const [results] = await connection.query(
            'DELETE FROM products WHERE Product_ID = ?',
            [productId]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        res.json({
            message: 'Product deleted successfully'
        });

    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
