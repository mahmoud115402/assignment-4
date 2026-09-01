const connection = require('../../DB/connectionDB');

const SUPPLIERS = async (req, res) => {

    try {
        const [results] = await connection.query(
            'SELECT * FROM suppliers'
        );

        res.json(results);

    } catch (err) {
        console.error('Error fetching suppliers:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const getSupplierById = async (req, res) => {

    const supplierId = req.params.id;

    try {
        const [results] = await connection.query(
            'SELECT * FROM suppliers WHERE Supplier_ID = ?',
            [supplierId]
        );

        if (results.length === 0) {
            return res.status(404).json({
                error: 'Supplier not found'
            });
        }

        res.json(results[0]);

    } catch (err) {
        console.error('Error fetching supplier:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const addSupplier = async (req, res) => {

    const {
        Supplier_Name,
        Contact_Number
    } = req.body;

    try {
        const [results] = await connection.query(
            `INSERT INTO suppliers
            (Supplier_Name, Contact_Number)
            VALUES (?, ?)`,
            [
                Supplier_Name,
                Contact_Number
            ]
        );

        res.status(201).json({
            message: 'Supplier added successfully',
            Supplier_ID: results.insertId
        });

    } catch (err) {
        console.error('Error adding supplier:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const updateSupplier = async (req, res) => {

    const supplierId = req.params.id;

    const {
        Supplier_Name,
        Contact_Number
    } = req.body;

    try {
        const [results] = await connection.query(
            `UPDATE suppliers
            SET Supplier_Name = ?,
                Contact_Number = ?
            WHERE Supplier_ID = ?`,
            [
                Supplier_Name,
                Contact_Number,
                supplierId
            ]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Supplier not found'
            });
        }

        res.json({
            message: 'Supplier updated successfully'
        });

    } catch (err) {
        console.error('Error updating supplier:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


const deleteSupplier = async (req, res) => {

    const supplierId = req.params.id;

    try {
        const [results] = await connection.query(
            'DELETE FROM suppliers WHERE Supplier_ID = ?',
            [supplierId]
        );

        if (results.affectedRows === 0) {
            return res.status(404).json({
                error: 'Supplier not found'
            });
        }

        res.json({
            message: 'Supplier deleted successfully'
        });

    } catch (err) {
        console.error('Error deleting supplier:', err);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


module.exports = {
    SUPPLIERS,
    getSupplierById,
    addSupplier,
    updateSupplier,
    deleteSupplier
};
