const productModel = require('../models/productModel');

const getAllProducts = async (req, res) => {
    const products = await productModel.getAllProducts()
    res.json(products);
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await productModel.getProductById(id);
    if(product === undefined){
        res.status(404).send('product not found');
    }
    res.json(product)
}

module.exports = {
    getAllProducts,
    getProductById,
}