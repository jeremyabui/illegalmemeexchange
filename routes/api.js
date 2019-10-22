const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// ------- Auth ------- //
router.post('/signup', ctrl.auth.createUser);
router.post('/login', ctrl.auth.createSession);
router.get('/verify', ctrl.auth.verifyAuth);

// ------- Profile ------- //
// router.get('/', ctrl.auth.showProfile)

module.exports = router;