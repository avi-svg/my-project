const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');


router.get('/', itemController.getItems);
router.get('/:index', itemController.getItemByIndex);
router.post('/', itemController.createItem);
router.put('/:index', itemController.updateItem);
router.delete('/:index', itemController.deleteItem);

module.exports = router;