const connection = require('../../DB/connectionDB');


const getAllSales = async (req, res) => {

    try {
        const [results] = await connection.query(
            'SELECT * FROM sales'
        );

        res.json(results);

    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const getSaleById = async (req, res) => {

    const saleId = req.params.id;

    try {
        const [results] = await connection.query(
            'SELECT * FROM sales WHERE Sale_ID = ?',
            [saleId]
        );

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Sale not found'
            });
        }

        res.json(results[0]);

    } catch (err) {
        console.error('Error fetching sale:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const addSale = async (req, res) => {

    const { Product_ID, Quantity_Sold, Sale_Date } = req.body;

    try {
        const [results] = await connection.query(
            `INSERT INTO sales
            (Product_ID, Quantity_Sold, Sale_Date)
            VALUES (?, ?, ?)`,
            [Product_ID, Quantity_Sold, Sale_Date]
        );

        res.status(201).json({
            message: 'Sale added successfully',
            Sale_ID: results.insertId
        });

    } catch (err) {
        console.error('Error adding sale:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const updateSale = async (req, res) => {

    const saleId = req.params.id;

    const {
        Product_ID,
        Quantity_Sold,
        Sale_Date
    } = req.body;

    try {
        const [results] = await connection.query(
            `UPDATE sales
            SET Product_ID = ?,
                Quantity_Sold = ?,
                Sale_Date = ?
            WHERE Sale_ID = ?`,
            [
                Product_ID,
                Quantity_Sold,
                Sale_Date,
                saleId
            ]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Sale not found'
            });
        }

        res.json({
            message: 'Sale updated successfully'
        });

    } catch (err) {
        console.error('Error updating sale:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const deleteSale = async (req, res) => {

    const saleId = req.params.id;

    try {
        const [results] = await connection.query(
            'DELETE FROM sales WHERE Sale_ID = ?',
            [saleId]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Sale not found'
            });
        }

        res.json({
            message: 'Sale deleted successfully'
        });

    } catch (err) {
        console.error('Error deleting sale:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const getSalesByProduct = async (req, res) => {

    const productId = req.params.id;

    try {
        const [results] = await connection.query(
            'SELECT * FROM sales WHERE Product_ID = ?',
            [productId]
        );

        res.json(results);

    } catch (err) {
        console.error('Error fetching sales:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports = {
    getAllSales,
    getSaleById,
    addSale,
    updateSale,
    deleteSale,
    getSalesByProduct
};
