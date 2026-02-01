const postgres = require('../config/postgres');

async function getAllCustomers(){
    const result = await postgres.query('SELECT * FROM customers');
    return result.rows;
}

async function getCustomerById(id){
    const result = await postgres.query('SELECT * FROM customers WHERE customer_id = $1', [id]);
    return result.rows[0];
}



module.exports = {
    getAllCustomers,
    getCustomerById
}