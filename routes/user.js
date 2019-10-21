const express = require ('express');
const router = express.Router();
const ctrl = require('../controllers');

//Index Route
router.get('/', ctrl.user.index);

//Find Route
router.get('/profile/:userId', ctrl.user.find);

//Create Route
router.post('/', ctrl.user.create);



//Export
module.exports = router;