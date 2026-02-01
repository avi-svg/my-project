const postgres = require('../config/postgres');

async function getAllProducts(){
    const QUERY = 'SELECT  product_id as id, product_name as name, image_src as image, price as price FROM public.products ';
    const result = await postgres.query(QUERY);
    return result.rows.map( row => ({
        ...row,
        price: +row.price
    }));
}

async function getProductById(id){
    const QUERY = 'SELECT  product_id as id, product_name as name, image_src as image, price as price, description FROM public.products WHERE product_id = $1';
    const result = await postgres.query(QUERY, [id]);

    const data = result.rows[0];
    return {
        ...data, 
        price: +data.price
    }
}

module.exports = {
    getAllProducts,
    getProductById,
}