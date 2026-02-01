const customerModel = require('../models/customerModel')

const getAllCustomer = async (req, res) => {
    const customers = await customerModel.getAllCustomers();
    res.json(customers);
}

const getCustomerById = async (req, res) => {
    const id = req.params.id;
    const customer = await customerModel.getCustomerById(id);
    if(customer === undefined){
        res.status(404).send('customer not found');
    }
    res.json(customer);
}

module.exports = {
    getAllCustomer,
    getCustomerById
}