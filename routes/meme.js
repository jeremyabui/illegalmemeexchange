const express = require ('express');
const router = express.Router();
const ctrl = require('../controllers');

//Index Route
router.get('/', ctrl.meme.index);

//Find Route
// router.get('/:title', ctrl.meme.find);

//Find by ID Route
router.get('/:memeId', ctrl.meme.findById)

//Create Route
router.post('/', ctrl.meme.create);

//Delete Route
router.delete('/:memeId', ctrl.meme.destroy);



module.exports = router;