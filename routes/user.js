const express = require ('express');
const router = express.Router();
const ctrl = require('../controllers');

//Index Route
router.get('/', ctrl.user.index);

//Find Route
router.get('/profile/:userId', ctrl.user.find);

//Create Route
router.post('/', ctrl.user.create);

//Update Route
router.put('/:userId', ctrl.user.update)

//Export
module.exports = router;