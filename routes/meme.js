const express = require ('express');
const router = express.Router();
const ctrl = require('../controllers');

//Index Route
router.get('/', ctrl.meme.index);

//Find Route
router.get('/:title', ctrl.meme.find);

//Create Route
router.post('/', ctrl.meme.create);

//Delete Route
router.delete('/:id', ctrl.meme.destroy);



module.exports = router;