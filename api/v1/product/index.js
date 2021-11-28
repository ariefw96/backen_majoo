const express = require('express');
const router = express.Router();
const controller = require('./controller');
const middelware = require('./../../../middleware/jwt-auth');

router.post('/add_product', middelware.verifyToken, controller.add_product );
router.get('/all_product', controller.all_product);
router.get('/get_product', controller.get_single_product);
router.patch('/update_product', middelware.verifyToken, controller.update_product);
router.delete('/delete_product', middelware.verifyToken, controller.delete_product);
router.get('/category', controller.getCategory);

module.exports = router;