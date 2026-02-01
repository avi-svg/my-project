const express = require('express');
const router = express.Router();
const itemRoutes = require('./itemRoutes');
const customerRoutes = require('./customerRoutes');
const productRoutes = require('./productRoutes');
const reviewRoutes = require('./reviewRoutes');
const orderRoutes = require('./orderRoutes');
const authRoutes = require('../auth/routes');
const middleware = require('../auth/middleware');

router.use('/items', itemRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/reviews', reviewRoutes);
router.use('/orders', middleware, orderRoutes);
router.use('/auth', authRoutes)

module.exports = router;