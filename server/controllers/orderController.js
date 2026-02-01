const orderModel = require('../models/orderModel');
const invoiceModel = require('../models/invoiceModel');
const postgres = require('../config/postgres');

const createInvoice = async (req, res) => {
    console.log("tt")
    const client = await postgres.getClient();
    try {
        await client.query('BEGIN');
        console.log("gg")
        const newInvoice = await invoiceModel.addNewInvoice(req.body, client);
        //next: orders todo
        console.log("zz");
        const order_detailes = await orderModel.addOrder(req.body, client);
        console.log("qq")
        await client.query('COMMIT');
        res.status(201).json({
            invoiceInfo: newInvoice,
            orderDetails: order_detailes
        });
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e);
        res.status(500).json(e);
    }finally {
    client.release();
  }
}


module.exports = {
    createInvoice,
}