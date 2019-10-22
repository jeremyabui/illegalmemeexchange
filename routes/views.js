const express = require('express');
const router = express.Router();
const path = require('path');

//Middleware

router.use(express.static(path.join(__dirname, '..public')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ('../views/index.html')));
});

//GET Signup
router.get('/signup', (req, res) => {
    res.sendFile('views/auth/signup.html', {
        root: `${__dirname}/../`
    });
});

//GET newMeme
router.get('/newMeme', (req, res) => {
    res.sendFile('views/auth/newMeme.html', {
        root: `${__dirname}/../`
    });
});

module.exports = router;